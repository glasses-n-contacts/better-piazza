const express = require('express');
const router = new express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with users');
});


router.post('/login', function(req, res, next) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      return next(err);
    }
    req.session.userId = user._id;
    // req.session.username = user.username;
    // req.session.email = user.email;
    return res.redirect('/');
  });
});

router.post('/create', function(req, res, next) {
  const userData = { email: req.body.email, password: req.body.password, role: parseInt(req.body.role) };
  User.create(userData, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect('/');
  });
});

module.exports = router;
