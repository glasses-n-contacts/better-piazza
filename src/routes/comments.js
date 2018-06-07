const express = require('express');
const router = new express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const Comments = require('../controllers/comments');

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  Comments.find_by_id(id)
    .then(comment => res.json({ comment }))
    .catch(next);
});

// Update a user
router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  const updateObject = req.body;
  Comments.update_by_id(id, updateObject)
    .then(comment => res.json({ comment }))
    .catch(next);
});

router.delete('/:id', async function(req, res, next) {
  Comments.remove_by_id(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.post('/create', function(req, res, next) {
  const commentData = req.body;
  const commentReq = new Comment(commentData);
  let comment;
  commentReq.save()
    .then(saved => {
      comment = saved;
      return Post.findById(req.body.post).exec();
    })
    .then(post => {
      if (!post.comments.includes(comment._id)) {
        post.comments.push(comment._id);
      }
      return post.save();
    })
    .then(() => {
      res.json({ comment });
    })
    .catch(next);
});

module.exports = router;
