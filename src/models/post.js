const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    trim: true,
  },
  body: {
    type: String,
    default: '',
    trim: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    body: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [{ // Aka the categories, TBD how we want to do this
    title: {
      type: String,
      default: '',
    },
  }],
  type: {
    type: String,
    enum: ['Note', 'Answer', 'Question'],
    default: 'Note',
  },
  image: {
    cdnUri: String,
    files: [],
  },
  attachments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Attachment',
  }],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;