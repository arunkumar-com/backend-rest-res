const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

// Create reservation
const createReservation = async (req, res) => {
  try {
    const { restaurantId, date, time, tableType, numberOfGuests } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const existingCount = await Reservation.countDocuments({ restaurant: restaurantId, date, time, tableType });
    if (existingCount >= restaurant.tables[tableType]) {
      return res.status(400).json({ message: 'No tables available for this date/time' });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      restaurant: restaurantId,
      date,
      time,
      tableType,
      numberOfGuests,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get reservations for current user
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate('restaurant', 'name')
      .sort('-createdAt');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations (admin)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('user', 'username email')
      .populate('restaurant', 'name');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a reservation
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await reservation.deleteOne();
    res.json({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check table availability for a given restaurant/date/time
const checkAvailability = async (req, res) => {
  try {
    const { restaurantId, date, time } = req.query;
    if (!restaurantId || !date || !time) {
      return res.status(400).json({ message: 'Missing restaurantId, date or time' });
    }

    const restaurant = await Restaurant.findById(restaurantId).select('tables').lean();
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const [twoCount, fourCount] = await Promise.all([
      Reservation.countDocuments({ restaurant: restaurantId, date, time, tableType: 'twoSeater' }),
      Reservation.countDocuments({ restaurant: restaurantId, date, time, tableType: 'fourSeater' }),
    ]);

    const available = {
      twoSeater: Math.max(0, restaurant.tables.twoSeater - twoCount),
      fourSeater: Math.max(0, restaurant.tables.fourSeater - fourCount),
    };

    res.json({ available });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get daily availability for all time slots
const getDailyAvailability = async (req, res) => {
  try {
    const { restaurantId, date } = req.query;
    if (!restaurantId || !date) {
      return res.status(400).json({ message: 'restaurantId and date are required' });
    }

    const restaurant = await Restaurant.findById(restaurantId).select('tables');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const reservations = await Reservation.find({ restaurant: restaurantId, date });

    const slots = [];
    for (let hour = 11; hour <= 22; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const bookedTwo = reservations.filter(r => r.time === time && r.tableType === 'twoSeater').length;
      const bookedFour = reservations.filter(r => r.time === time && r.tableType === 'fourSeater').length;
      slots.push({
        time,
        twoSeater: Math.max(restaurant.tables.twoSeater - bookedTwo, 0),
        fourSeater: Math.max(restaurant.tables.fourSeater - bookedFour, 0),
      });
    }

    res.json({ slots });
  } catch (error) {
    console.error('Error in getDailyAvailability:', error);
    res.status(500).json({ message: 'Server error fetching slots' });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getAllReservations,
  cancelReservation,
  checkAvailability,
  getDailyAvailability,
};
