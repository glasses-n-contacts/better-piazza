const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'index api route',
  });
});

module.exports = router;
