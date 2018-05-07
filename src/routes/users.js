const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const Users = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with users');
});

// TODO: Role protect?
router.get('/all', async function(req, res, next) {
  const users = await Users.all();
  res.send(users);
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
