const Comment = require('../models/comment');

module.exports.find_by_id = function(id) {
  return Comment.findById(id).exec();
};

module.exports.all = function() {
  return Comment.find({}).exec();
};

module.exports.update_by_id = function(id, updateObject) {
  return Comment.findOneAndUpdate({ _id: id }, { '$set': updateObject }).exec();
};

module.exports.remove_by_id = function(id) {
  return Comment.findOneAndRemove({ _id: id }).exec();
};
