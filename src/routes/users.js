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
  let pageNum = req.params.pageNum || 0;
  let users = await Users.paginate(pageNum);
  res.send({ users: users });
});

router.get('/user/:id', async function(req, res, next) {
  let id = req.params.id;
  let user = await Users.find_by_id(id);
  console.log('Found user');
  console.log(user);
  res.status(200).send(user);
});

// Update a user
router.put('/update/:id', async function(req, res, next) {
  let id = req.params.id;
  const updateObject = {};
  if (req.body.email && req.body.email.length > 0) {
    updateObject['email'] = req.body.email;
  };
  if (req.body.password && req.body.password.length > 0) {
    updateObject['password'] = req.body.password;
  };
  let user = await Users.update_by_id(id, updateObject);
  res.status(200).send(user);
});

router.delete('/:id', async function(req, res, next) {
  await Users.remove_by_id(req.params.id);
  res.send({ success: true });
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
  // TODO: attachments, tags
  let userData = { email: req.body.email, password: req.body.password, role: req.body.role, type: req.body.type };
  User.create(userData, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.status(200).json({ id: user._id });
  });
});

module.exports = router;

module.exports.requireLogin = function() {
  return function(req, res, next) {
    if (req.session && req.session.userId) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      console.log('Not authorized: ' + req.session);
      console.log(req.session.userId);
      res.status(401).send({ error: 'Not logged in' });
    }
  };
};