var mongoose = require('mongoose')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
var bcrypt = require ('bcryptjs')
var userSchema = mongoose.Schema({
 email: {
   type: String,
   required: true,
   unique:true,
   match: emailRegex
 },
 name: {
   type:String,
   required:true,
   unique:true,
   minlength: [3, 'Password must be 3 and 99 charactes']
 },
 password: {
   type:String,
   required:true,
   minlength: [3, 'Password must be 3 and 99 charactes']
 },
 reservations_id: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Room'
}],
dateJoined: {
   type: Date,
   default: Date.now
},
isAdmin: {
   type: Boolean,
   default: false
}
})

userSchema.pre('save', function(next){
  var user = this
  var hash = bcrypt.hashSync(user.password, 10)
user.password = hash
next()
})

userSchema.statics.findbyEmail = function(email, cb) {
  this.findOne({
    email: email}, function(err,foundUser){
      if (err) return cb(err)
      cb(null, foundUser)
    })
}

userSchema.methods.validPassword = function(givenPassword) {
  var hashedpassword = this.password
return bcrypt.compareSync(givenPassword, hashedpassword)
}
userSchema.statics.isAdmin = function(adminKey) {
  return (adminKey === 'admin')
}


var User = mongoose.model('User', userSchema)

module.exports = User
