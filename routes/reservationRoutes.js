
const express = require('express');
const router = express.Router();
const {
  createReservation,
  getUserReservations,
  cancelReservation,
  getAllReservations,
} = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/authMiddleware'); // assume both protect and admin are exported here

// Protect all routes below
router.use(protect);

// POST /api/reservations - create a reservation
// GET  /api/reservations    - get current user's reservations
router.route('/')
  .post(createReservation)
  .get(getUserReservations);

// DELETE /api/reservations/:id - cancel a reservation
router.delete('/:id', cancelReservation);

// Admin-only route to fetch all reservations
// GET /api/reservations/all
router.get('/all', admin, getAllReservations);

module.exports = router;
