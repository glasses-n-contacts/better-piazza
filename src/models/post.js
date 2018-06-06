const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const CustomException = require('../CustomException');

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
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  // answers to questions
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, { timestamps: true });

PostSchema.pre('validate', function(next) {
  if (this.type === 'Question') {
    if (!this.title) {
      throw new CustomException(422, 'Question needs a title.');
    }
  }

  if (this.type === 'Answer') {
    if (!this.question) {
      throw new Error('Question field missing for answer.');
    }
  }

  next();
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
