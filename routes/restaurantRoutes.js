const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  checkAvailability,
} = require('../controllers/restaurantController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/availability', checkAvailability);

// POST /api/restaurants - Create restaurant (Admin only)
router.post('/', protect, admin, createRestaurant);

module.exports = router;
