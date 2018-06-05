const Post = require('../models/post');

module.exports.find_by_id = function(id) {
  return Post.findById(id).exec();
};

module.exports.all = function() {
  return Post.find({}).exec();
};

/**
 * [paginate description]
 * @param  {[type]}   page     The current page # we're on
 * @param  {[type]}   query    [description]
 * @param  {[type]}   perPage  Number of users per page
 * @return {Promise} [description]
 */
module.exports.paginate = function(page, query = {}, perPage = 10) {
  return Post.find(query).limit(perPage).skip(perPage * page).sort({ time: -1 }).exec();
};

module.exports.update_by_id = function(id, updateObject) {
  return Post.findOneAndUpdate({ _id: id }, { '$set': updateObject }).exec();
};

module.exports.remove_by_id = function(id) {
  return Post.findOneAndRemove({ _id: id }).exec();
};

module.exports.get_comments = function(id) {
  return new Promise((resolve, reject) => {
    Post.findById(id).exec()
      .then(post => {
        if (!post) {
          reject(new Error(`Post not found with id ${id}`));
        }

        const commentPromises = Promise.all(post.comments.map(commentId => {
          return Comment.findById(commentId)
            .populate('author')
            .sort({ createdAt: 'asc' })
            .exec();
        }));
        resolve(commentPromises);
      })
      .catch(reject);
  });
};
