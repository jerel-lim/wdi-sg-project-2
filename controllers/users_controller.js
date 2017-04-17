const passport = require('passport')
const User = require('../models/user')
const Room = require('../models/room')


let userController = {
  signupForm: function (req, res) {
    if (req.isAuthenticated() === true)
    // {req.flash('error', 'You are already logged in.')
    {return res.redirect('/users/'+ req.user.id)}
    res.render('auth/signup')
  },

  authSignup: function (req, res, next) {
    if(!req.body.password || !req.body.name || !req.body.email) {
      req.flash('error', 'Please fill in all fields')
      res.redirect('/signup')
    }
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/users/' + req.body.id, // edit /profile to user page
      failureRedirect: '/signup',
      failureFlash: true
    })
    return signupStrategy(req, res, next)
  },

  loginForm: function (req, res) {
    if (req.isAuthenticated() === true)
    // {req.flash('error', 'You are already logged in.')
    {return res.redirect('/users/'+ req.user.id)}
    res.render('auth/login')
  },

  authLogin: function (req, res, next) {
  if (!req.body.email || !req.body.password) {
  req.flash('error', 'Please fill in all fields')
    // req.flash('flash', {
    //   type: 'danger',
    //   message: 'Please fill in all fields.'
    // })
    res.redirect('/login')
  }

    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/users/' + req.body.id, // to edit /profile to user page
      failureRedirect: '/login',
      failureFlash: true
    })
    return loginStrategy(req, res, next)
  },

  logout: function (req, res) {
    req.logout()
    req.flash('success', 'You have logged out. See you again!')
    // req.flash('flash', {
    //   type: 'success',
    //   message: 'You have logged out. See you again!'
    // })
    res.redirect('/')
  },

  show: function (req, res) {
    User.findById(req.params.id).populate('reservations_id').exec( function (err, user) {
      if (err) res.redirect('/login')
      res.render('rooms/index', {
        userProfile: user
      })
    })
  }

}

module.exports = userController
