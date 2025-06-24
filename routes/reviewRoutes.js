const express = require('express');
const router = express.Router();
const {
  createReview,
  getRestaurantReviews,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/:restaurantId', getRestaurantReviews);

// Protected routes
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
