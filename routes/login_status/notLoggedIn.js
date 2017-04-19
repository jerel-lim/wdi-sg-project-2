module.exports = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('error', 'Page is for members only. Please log in or register.')
  return res.redirect('/login')
}
