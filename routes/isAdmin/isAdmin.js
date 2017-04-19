module.exports = function (req, res, next) {
  if (req.user.isAdmin === false) return next()
  req.flash('error', 'Page is not for admins. Please log in as a user.')
  return res.redirect('/login')
}
