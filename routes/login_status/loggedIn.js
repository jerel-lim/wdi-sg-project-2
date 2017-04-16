module.exports = function (req, res, next) {
  if (req.isAuthenticated() === false) return next()
  req.flash('flash', {
    type: 'warning',
    message: 'You are already logged in.'
  })
  return res.redirect('/users/:id') //to change the redirect address
}
