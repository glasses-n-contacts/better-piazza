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

    // it('should return email taken for the same email', (done) => {
    //   injectUser('lz107@duke.edu', '1', 'password')
    //     .then(() => {
    //       chai.request(server)
    //         .post('/users/create')
    //         .send({
    //           email: 'lz107@duke.edu',
    //           role: 1,
    //           password: 'password',
    //         })
    //         .end((err, res) => {
    //           res.should.have.status(422);
    //           assert.equal(res.body.message, 'email is already taken.');
    //           done();
    //         });
    //     })
    //     .catch(err => done(err));
    // });

    // it('should return email is blank when no email provided', (done) => {
    //   chai.request(server)
    //     .post('/user/signup')
    //     .send({
    //       email: '',
    //       name: 'yuhan2',
    //       password: 'password',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(422);
    //       assert.equal(res.body.message, 'email can\'t be blank');
    //       done();
    //     });
    // });
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
    //   it('should successfully log in a user and return token', (done) => {
    //     injectUser('han.yu@duke.edu', 'Bill Yu', 'password')
    //       .then(() => {
    //         chai.request(server)
    //           .post('/user/login')
    //           .send({
    //             email: 'han.yu@duke.edu',
    //             password: 'password',
    //           })
    //           .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.have.property('token');
    //             done();
    //           });
    //       })
    //       .catch(err => done(err));
    //   });

    //   it('should reject nonexistent user', (done) => {
    //     chai.request(server)
    //       .post('/user/login')
    //       .send({
    //         email: 'eric.song@duke.edu',
    //         password: 'password',
    //       })
    //       .end((err, res) => {
    //         res.should.have.status(401);
    //         done();
    //       });
    //   });

    //   it('should reject incorrect password', (done) => {
    //     chai.request(server)
    //       .post('/user/login')
    //       .send({
    //         email: 'han.yu@duke.edu',
    //         password: 'incorrectpassword',
    //       })
    //       .end((err, res) => {
    //         res.should.have.status(401);
    //         done();
    //       });
    //   });
    // });

    // describe('user profile', () => {
    //   let token;

    //   before((done) => {
    //     User.deleteMany({}).exec()
    //       .then(() => injectUser('lucy.zhang@duke.edu', 'Lucy Zhang', 'password'))
    //       .then(lucy => {
    //         token = lucy.generateJwt();
    //         done();
    //       })
    //       .catch(err => done(err));
    //   });

    //   it('should return existing user\'s profile for valid token', (done) => {
    //     chai.request(server)
    //       .get('/user/profile')
    //       .set({
    //         Authorization: 'Bearer ' + token,
    //       })
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         const body = res.body;
    //         assert.equal(body.name, 'Lucy Zhang');
    //         assert.equal(body.email, 'lucy.zhang@duke.edu');
    //         done();
    //       });
    //   });

    //   it('should return 401 for invalid token', (done) => {
    //     chai.request(server)
    //       .get('/user/profile')
    //       .set({
    //         Authorization: 'Bearer ' + randomToken,
    //       })
    //       .end((err, res) => {
    //         res.should.have.status(401);
    //         done();
    //       });
    //   });

    //   it('should return 401 for invalid _id in token', (done) => {
    //     let invalidToken;

    //     injectUser('han.yu@duke.edu', 'Bill Yu', 'password')
    //       .then(bill => {
    //         invalidToken = bill.generateJwt();
    //         return User.deleteOne({ email: 'han.yu@duke.edu' }).exec();
    //       })
    //       .then(() => {
    //         chai.request(server)
    //           .get('/user/profile')
    //           .set({
    //             Authorization: 'Bearer ' + invalidToken,
    //           })
    //           .end((err, res) => {
    //             res.should.have.status(401);
    //             done();
    //           });
    //       })
    //       .catch(err => done(err));
    //   });
  });
});
