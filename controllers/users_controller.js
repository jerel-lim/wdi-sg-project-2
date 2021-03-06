const passport = require('passport')
const User = require('../models/user')
const Room = require('../models/room')

let userController = {
  signupForm: function (req, res) {
    if (req.isAuthenticated() === true) {
      return res.redirect('/users/' + req.user.id)
    }
    res.render('auth/signup')
  },

  authSignup: function (req, res, next) {
    if (!req.body.password || !req.body.name || !req.body.email) {
      req.flash('error', 'Please fill in all fields')
      res.redirect('/signup')
    }
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/users/' + req.body.id,
      failureRedirect: '/signup',
      failureFlash: true
    })
    return signupStrategy(req, res, next)
  },

  loginForm: function (req, res) {
    if (req.isAuthenticated() === true) {
      return res.redirect('/users/' + req.user.id)
    }
    res.render('auth/login')
  },

  authLogin: function (req, res, next) {
    if (!req.body.email || !req.body.password) {
      req.flash('error', 'Please fill in all fields')
      res.redirect('/login')
    }

    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/users/' + req.body.id,
      failureRedirect: '/login',
      failureFlash: true
    })
    return loginStrategy(req, res, next)
  },

  logout: function (req, res) {
    req.logout()
    req.flash('success', 'You have logged out. See you again!')
    res.redirect('/')
  },

  show: function (req, res) {
    if (req.user.isAdmin === false) {
      res.redirect('/rooms')
    } else {
      (res.redirect('/rooms/admin'))
    }
  }
}

module.exports = userController
