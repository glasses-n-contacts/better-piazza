const Post = require('../models/post');
const User = require('../models/user');

module.exports.all = function() {
  return Post.find({}).exec();
};

module.exports.paginate = function(page, query = {}, perPage = 10) {
  return Post.find(query).limit(perPage).skip(perPage * page).sort({ time: -1 }).exec();
};

module.exports.find_by_id = function(id) {
  return Post.findById(id).exec();
};

module.exports.update_by_id = function(id, updateObject) {
  return Post.findOneAndUpdate({ _id: id }, { '$set': updateObject }).exec();
};

module.exports.remove_by_id = function(id) {
  return Post.findOneAndRemove({ _id: id }).exec();
};

module.exports.posts_for_user = function(userId) {
  return Post.find({ author: userId }).exec();
}