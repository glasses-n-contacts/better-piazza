const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

describe('posts', () => {
  const userCredentials = {
    email: 'test@gmail.com',
    password: 'test',
  };

  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(userCredentials)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        res.body.should.have.property('id');
        done();
      })
  });

  it('should successfully create a post', (done) => {
    chai.request(server)
      .post('/posts/create')
      .send({
        title: 'anime title',
        body: 'animeeee',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id');
        done();
      });
  });
});