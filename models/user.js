var mongoose = require('mongoose')

// setting up schema
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie name cannot be empty'],
    minlength: [3, 'Movie name too short']
  },
  email: String,
})

// setting up models
var Movie = mongoose.model('User', userSchema)

module.exports = User
