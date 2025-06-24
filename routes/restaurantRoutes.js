const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  checkAvailability,
} = require('../controllers/restaurantController');

// Public routes
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/availability', checkAvailability);

// In a real application, this would be protected by admin middleware
router.post('/', createRestaurant);

module.exports = router;
