const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

describe('post', () => {
  let lucyId;
  let questionId;

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
        chai.request(server)
          .post('/posts/create')
          .send({
            author: lucyId,
            type: 'Question',
            title: 'Question??',
            body: 'questionbody',
          })
          .end((err, res) => {
            questionId = res.body.post._id;
            done();
          });
      });
  });

  after(() => {
    return Promise.all([
      Post.deleteMany({}).exec(),
      User.deleteMany({}).exec(),
    ]);
  });

  describe('get a post', () => {
    it('should get a post with id', done => {
      chai.request(server)
        .get(`/posts/${questionId}`)
        .end((err, res) => {
          res.should.have.status(200);
          assert.strictEqual(res.body.post.title, 'Question??');
          done();
        });
    });
  });

  describe('pagination', () => {
    let postIds = [];
    let posts = [...Array(14).keys()];
    before(done => {
      const postPromises = posts.map(id => {
        return new Promise((resolve, reject) => {
          chai.request(server)
            .post('/posts/create')
            .send({
              type: 'Question',
              author: lucyId,
              title: id,
            })
            .end((err, res) => {
              if (err) reject(err);
              resolve(res);
            });
        });
      });
      Promise.all(postPromises)
        .then(results => {
          postIds = results.map(result => result.body.post._id);
          done();
        })
        .catch(done);
    });

    after(() => {
      return Post.deleteMany({ _id: { $in: postIds }}).exec();
    });

    it('should return <=10 posts', (done) => {
      chai.request(server)
        .get('/posts/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.posts.should.have.length.below(11);
          done();
        });
    });
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

    it('should create a new question', done => {
      chai.request(server)
        .post('/posts/create')
        .send({
          type: 'Question',
          title: 'Why is TG so good?',
          author: lucyId,
        })
        .end((err, res) => {
          res.should.have.status(200);
          assert.strictEqual(res.body.post.title, 'Why is TG so good?');
          done();
        });
    });

    it('should require a question for answer', done => {
      chai.request(server)
        .post('/posts/create')
        .send({
          type: 'Answer',
          author: lucyId,
        })
        .end((err, res) => {
          res.should.have.status(422);
          assert.strictEqual(res.body.message, 'Question field missing for answer.');
          done();
        });
    });

    it('should require content for answer', done => {
      chai.request(server)
        .post('/posts/create')
        .send({
          type: 'Answer',
          question: questionId,
          author: lucyId,
        })
        .end((err, res) => {
          res.should.have.status(422);
          assert.strictEqual(res.body.message, 'Answer needs content.');
          done();
        });
    });

    it('should create a new answer', done => {
      chai.request(server)
        .post('/posts/create')
        .send({
          type: 'Answer',
          body: 'answer body',
          author: lucyId,
          question: questionId,
        })
        .end((err, res) => {
          res.should.have.status(200);
          assert.strictEqual(res.body.post.body, 'answer body');
          done();
        });
    });
  });

  describe('update a post', () => {
    it('should update the body of a question', done => {
      chai.request(server)
        .put(`/posts/${questionId}`)
        .send({
          body: 'new body',
        })
        .end((err, res) => {
          res.should.have.status(200);
          Post.findById(questionId).exec()
            .then(post => {
              assert.strictEqual(post.body, 'new body');
              done();
            })
            .catch(done);
        });
    });
  });

  describe('delete a post', () => {
    it('should delete Lucy\'s question', done => {
      chai.request(server)
        .delete(`/posts/${questionId}`)
        .end((err, res) => {
          res.should.have.status(200);
          Post.findById(questionId).exec()
            .then(post => {
              assert.strictEqual(post, null);
              done();
            })
            .catch(done);
        });
    });
  });
});
