module.exports = function (req, res, next) {
  if (req.user.isAdmin === true) return next()
  req.flash('error', 'Page is for admins only. Please log in as admin.')
  return res.redirect('/login')
}
