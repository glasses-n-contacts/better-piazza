const mongoose = require('mongoose');
const User = mongoose.model('User');
// const jwt = require('jsonwebtoken');
// const credentials = require('../server/getCredentials')();

// const { injectUser } = require('./tools');

// some random token
// const expiry = new Date();
// expiry.setDate(expiry.getDate() + 7);
// const randomToken = jwt.sign({
//   // no _id field
//   email: 'han.yu@duke.edu',
//   name: 'Bill Yu',
//   exp: parseInt(expiry.getTime() / 1000),
// }, credentials.secret);

describe('user', () => {
  describe('user creation', () => {
    beforeEach(() => {
      return User.deleteMany({}).exec();
    });

    it('should successfully create a new user', (done) => {
      chai.request(server)
        .post('/users/create')
        .send({
          email: 'lz107@duke.edu',
          password: 'password',
          role: 'Student',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id');
          done();
        });
    });
  });

  describe('user log in', () => {
    it('user login', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({
          email: 'lz107@duke.edu',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id');
          done();
        });
    });
  });
});
