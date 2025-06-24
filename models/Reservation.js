const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurant'
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  tableType: {
    type: String,
    required: true,
    enum: ['twoSeater', 'fourSeater']
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  }
}, {
  timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
