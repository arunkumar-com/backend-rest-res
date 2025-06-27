const express = require('express');
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  cancelReservation,
  getAllReservations,
  checkAvailability,
  getDailyAvailability
} = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/check', checkAvailability);           // Check a specific time slot
router.get('/slots', getDailyAvailability);        // Get all availability for a given date

// Protected user routes
router.post('/', protect, createReservation);      // Create a reservation
router.get('/', protect, getUserReservations);     // Get reservations of the logged-in user
router.delete('/:id', protect, cancelReservation); // Cancel a reservation

// Admin-only route
router.get('/all', protect, admin, getAllReservations); // Get all reservations (admin only)

module.exports = router;
