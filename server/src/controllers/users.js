const User = require('../models/user');

module.exports.all = function() {
  return User.find({}).exec();
};

/**
 * [paginate description]
 * @param  {[type]}   page     The current page # we're on
 * @param  {[type]}   query    [description]
 * @param  {[type]}   perPage  Number of users per page
 * @return {Promise} [description]
 */
module.exports.paginate = function(page, query = {}, perPage = 10) {
  return User.find(query).limit(perPage).skip(perPage * page).sort({ time: -1 }).exec();
};
