var mongoose = require('mongoose')
var roomSchema = mongoose.Schema({
  beds: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
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
  }
})

// userSchema.pre('save', function (next) {
//   var user = this
//   var hash = bcrypt.hashSync(user.password, 10)
//   user.password = hash
//   next()
// })
//
// userSchema.statics.findbyEmail = function (email, cb) {
//   this.findOne({
//     email: email}, function (err, foundUser) {
//     if (err) return cb(err)
//     cb(null, foundUser)
//   })
// }
//
// userSchema.methods.validPassword = function (givenPassword) {
//   var hashedpassword = this.password
//   return bcrypt.compareSync(givenPassword, hashedpassword)
// }
// userSchema.statics.isAdmin = function (adminKey) {
//   this.isAdmin = (adminKey === 'admin')
// }

var Room = mongoose.model('Room', roomSchema)

module.exports = Room
