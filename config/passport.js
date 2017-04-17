var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, givenEmail, givenPassword, next) {
  User.findOne({ 'email': givenEmail }, function (err, foundUser) {
    if (err) return next(err)
    if (foundUser) {
      return next(null, false, req.flash('error', 'Email is already in used. Please login using email or register using another email.')
      // req.flash('flash', {
      //   type: 'danger',
      //   message: 'Email is already in used. Please login using email or register using another email.'
      // })
    )
    } else {
      var newUser = new User({
        email: givenEmail,
        name: req.body.name,
        password: givenPassword,
        isAdmin: User.isAdmin(req.body.adminKey)
      })

      newUser.save(function (err, data) {
        if (err) {
          req.flash('error', 'Registration failed')
          return next(err)
        }
        next(null, data)
      })
    }
  })
}))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, givenEmail, givenPassword, next) {
  User.findOne({ 'email': givenEmail}, function (err, foundUser) {
    if (err) return next(err)
    if (!foundUser) {
      return next(err, false, req.flash('error', 'No such user found.')
    //
    // req.flash('flash', {
    //     type: 'danger',
    //     message: 'No such user found.'
    //   })
    )
    }
    if (!foundUser.validPassword(givenPassword)) {
      return next(null, false, req.flash('error', 'Invalid password.')

      // req.flash('flash', {
      //   type: 'danger',
      //   message: 'Invalid password.'
      // })
    )
    }
    return next(err, foundUser)
  })
}))

module.exports = passport
