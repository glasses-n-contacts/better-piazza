const express = require('express');
const router = new express.Router();
const Post = require('../models/post');
// const User = require('../models/user');
const Posts = require('../controllers/posts');


router.get('/all/:pageNum?', async function(req, res, next) {
  let pageNum = req.params.pageNum || 0;
  let posts = await Posts.paginate(pageNum);
  res.send({ posts: posts });
});

router.get('/post/:id', async function(req, res, next) {
  let id = req.params.id;
  let post = await Posts.find_by_id(id);
  console.log('Found post');
  console.log(post);
  res.status(200).send(post);
});

// Update a post
router.put('/:id', async function(req, res, next) {
  let id = req.params.id;
  const updateObject = {};
  if (req.body.title) {
    updateObject['title'] = req.body.title;
  };
  if (req.body.body) {
    updateObject['body'] = req.body.body;
  };
  let post = await Posts.update_by_id(id, updateObject);
  res.status(200).send(post);
});

router.delete('/:id', async function(req, res, next) {
  await Posts.remove_by_id(req.params.id);
  res.send({ success: true });
});

router.post('/create', function(req, res, next) {
  // TODO: more parameters
  const postData = { title: req.body.title, body: req.body.body, author: req.session.userId };
  Post.create(postData, function(err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.status(200).json({ id: post._id });
  });
});
module.exports = router;