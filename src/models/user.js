const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Student', 'Teacher'],
    default: 'Student',
    required: true,
  },
  points: {
    type: Number,
    default: 0,
    required: true,
  },
  point_history: [{
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    point_value: { type: Number },
    timestamp: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

// hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  const user = this; // eslint-disable-line no-invalid-this
  if (user.password && user.password.length > 0) {
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        console.log('Error after save: ' + err);
        return next(err);
      }
      user.password = hash;
      next(null, user);
    });
  } else {
    return next(null, user);
  }
});

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
    .exec(function(err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        let err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        return callback(err, user);
      });
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
