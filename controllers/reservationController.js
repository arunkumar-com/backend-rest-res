



const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

const createReservation = async (req, res) => {
  try {
    const { restaurantId, date, time, tableType, numberOfGuests } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const availableTables = restaurant.tables[tableType];
    if (availableTables <= 0) {
      return res.status(400).json({ message: 'No tables available for selected type' });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      restaurant: restaurantId,
      date,
      time,
      tableType,
      numberOfGuests,
    });

    restaurant.tables[tableType] -= 1;
    await restaurant.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const restaurant = await Restaurant.findById(reservation.restaurant);
    if (restaurant) {
      restaurant.tables[reservation.tableType] += 1;
      await restaurant.save();
    }

    await reservation.deleteOne();
    res.json({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getAllReservations,
  cancelReservation,
};
