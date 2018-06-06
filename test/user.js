const mongoose = require('mongoose');
const User = mongoose.model('User');

describe('user', () => {
  const users = [...Array(14).keys()];

  describe('multiple user creation', () => {
    beforeEach(() => {
      return User.deleteMany({}).exec();
    });

    it('should successfully create new users', (done) => {
      const userPromises = users.map(i => {
        return new Promise((resolve, reject) => {
          chai.request(server)
            .post('/users/create')
            .send({
              email: 'test' + i + '@gmail.com',
              password: 'password',
              role: 'Student',
            })
            .end((err, res) => {
              if (err) reject(err);
              resolve(res);
            });
          });
      });
      Promise.all(userPromises)
        .then(results => {
          results.forEach(res => {
            res.should.have.status(200);
            res.body.should.have.property('id');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('user creation', () => {
    beforeEach(() => {
      return User.deleteMany({}).exec();
    });
    it('should successfully create a new user', (done) => {
      chai.request(server)
        .post('/users/create')
        .send({
          email: 'test@gmail.com',
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
          email: 'test@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id');
          done();
        });
    });
  });

  describe('user pagination', () => {
    it('should return <=10 users', (done) => {
      chai.request(server)
        .get('/users/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.users.should.have.length.below(11);
          done();
        });
    });
  });
});