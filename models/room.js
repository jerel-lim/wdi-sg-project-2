var mongoose = require('mongoose')
var roomSchema = mongoose.Schema({
  beds: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  dateFrom: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateTo: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  },
  createdByBooking: {
    type: Array,
    default: []
  }
})

var Room = mongoose.model('Room', roomSchema)

module.exports = Room
