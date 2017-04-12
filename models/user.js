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
   minlength: [8, 'Password must be 8 and 99 charactes']
 }
})

userSchema.pre('save', function(next){
  var user = this
  var hash = bcrypt.hashSync(user.password, 10)
// console.log('original password', user.password)
user.password = hash
// console.log('hased password', hash)
next()
})

var User = mongoose.model('User', userSchema)

module.exports = User
