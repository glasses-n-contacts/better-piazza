const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Question', 'Answer', 'Note'],
    default: 'Question',
    required: true,
  },
  Category: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  numViews: {
    type: Number,
    default: 0,
    required: true,
  },
  totalViewTime: {
    type: Number, // unit: seconds
    default: 0,
    required: true,
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  attachments: [{
    type: String, // filename
  }],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
