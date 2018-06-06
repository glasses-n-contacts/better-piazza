const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

describe('post', () => {
  let lucyId;

  before(done => {
    chai.request(server)
      .post('/users/create')
      .send({
        email: 'lucy.zhang@gmail.com',
        password: 'password',
        role: 'Student',
      })
      .end((err, res) => {
        lucyId = res.body.id;
        done();
      });
  });

  after(() => {
    return Promise.all([
      Post.deleteMany({}).exec(),
      User.deleteMany({}).exec(),
    ]);
  });

  describe('create new post', () => {
    it('should require a title for question', done => {
      chai.request(server)
        .post('/posts/create')
        .send({
          type: 'Question',
          author: lucyId,
        })
        .end((err, res) => {
          res.should.have.status(422);
          assert.strictEqual(res.body.message, 'Question needs a title.');
          done();
        });
    });
  });
});
