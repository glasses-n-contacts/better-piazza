const User = require('../models/user');

module.exports.all = function() {
  return User.find({}).exec();
};
