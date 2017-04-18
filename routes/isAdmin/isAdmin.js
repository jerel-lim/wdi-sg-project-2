module.exports = function (req, res, next) {
  if (req.user.isAdmin === false) return next()
  req.flash('error', 'Page is not for admins. Please log in as a user.')
  // req.flash('flash', {
  //   type: 'danger',
  //   message: 'Page is for members only. Please log in or register.'
  // })
  return res.redirect('/login')
}
