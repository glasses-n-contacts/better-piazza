const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const Users = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with users');
});

// TODO: Role protect?
router.get('/all/:pageNum?', async function(req, res, next) {
  let pageNum = req.params.pageNum ? req.params.pageNum : 0;
  let users = await Users.paginate(pageNum);
  res.json(users);
});


router.post('/login', function(req, res, next) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      return next(err);
    }
    if (req.session) {
      req.session.userId = user._id;
    }
    res.status(200).json({ id: user._id });
  });
});

router.post('/create', function(req, res, next) {
  const userData = { email: req.body.email, password: req.body.password, role: req.body.role };
  User.create(userData, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.status(200).json({ id: user._id });
  });
});

module.exports = router;
