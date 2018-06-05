const express = require('express');
const router = new express.Router();
const Post = require('../models/post');
const Posts = require('../controllers/posts');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Posts.all()
    .then(posts => res.json({ posts }))
    .catch(next);
});

router.get('/all/:pageNum?', function(req, res, next) {
  let pageNum = req.params.pageNum || 0;
  Posts.paginate(pageNum)
    .then(posts => res.json({ posts }))
    .catch(next);
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  Posts.find_by_id(id)
    .then(post => res.json({ post }))
    .catch(next);
});

// Update a user
router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  const updateObject = req.body; // change to specific updates later
  Posts.update_by_id(id, updateObject)
    .then(post => res.json({ post }))
    .catch(next);
  res.status(200).send(user);
});

router.delete('/:id', function(req, res, next) {
  Posts.remove_by_id(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.post('/create', function(req, res, next) {
  const postData = req.body; // change to specific ones later
  const reqPost = new Post(postData);
  reqPost.save()
    .then(post => res.json({ post }))
    .catch(next);
});

router.get('/:id/comments', function(req, res, next) {
  Posts.get_comments(req.params.id)
    .then(comments => res.json({ comments }))
    .catch(next);
});

module.exports = router;