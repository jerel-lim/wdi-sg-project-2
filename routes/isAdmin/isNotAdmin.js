module.exports = function (req, res, next) {
  if (req.user.isAdmin === true) return next()
  req.flash('error', 'Page is for admins only. Please log in as admin.')
  // req.flash('flash', {
  //   type: 'danger',
  //   message: 'Page is for members only. Please log in or register.'
  // })
  return res.redirect('/login')
}
