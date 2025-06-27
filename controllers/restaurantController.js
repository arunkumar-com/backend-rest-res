const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a restaurant (admin only in real app)
// @route   POST /api/restaurants
// @access  Public (should be Private/Admin)
const createRestaurant = async (req, res) => {
  try {
    const { name, description, image, tables } = req.body;
    const restaurant = await Restaurant.create({
      name,
      description,
      image,
      tables,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Check table availability
// @route   GET /api/restaurants/:id/availability?date=2025-06-30&time=19:00
// @access  Public
const checkAvailability = async (req, res) => {
  try {
    const { date, time } = req.query;
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const reservations = await Reservation.find({
      restaurant: req.params.id,
      date,
      time,
    });

    const reservedCounts = { twoSeater: 0, fourSeater: 0 };
    reservations.forEach(r => {
      reservedCounts[r.tableType] += 1;
    });

    const availableTables = {
      twoSeater: restaurant.tables.twoSeater - reservedCounts.twoSeater,
      fourSeater: restaurant.tables.fourSeater - reservedCounts.fourSeater,
    };

    res.json(availableTables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  checkAvailability,
};
