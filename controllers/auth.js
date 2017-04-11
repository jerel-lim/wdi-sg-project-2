var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.route('/register')
.get(function(req, res) {
  res.render('auth/signup')
})

.post(function(req, res) {
  console.log(req.body)
  var newUser = new User ({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  })

  newUser.save(function(err,data){
    if(err) return res.redirect('/login/register')
    res.redirect('/profile')
  })
})


module.exports = router;
