const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
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
    default: 'user',
    required: true,
  },
  points: {
    type: Number,
    default: 0,
    required: true
  },
  point_history: [{
    post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
    point_value: { type: Number },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true })

//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  if (this.password && this.password.length > 0) {
    //console.log('Trying to hash');
    bcrypt.hash(this.password, 10, function(err, hash) {
      if (err) {
        console.log('Error after save: ' + err);
        return next(err);
      }
      this.password = hash;
      console.log('Saved password successfully');
      next(null, this);
    });
  } else {
    return next(null, user);
  }
});

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
    .exec(function(err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        return callback(err, user);
      })
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;