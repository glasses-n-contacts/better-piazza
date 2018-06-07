const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

function resetComment(lucyId, questionId) {
  return new Promise((resolve, reject) => {
    Comment.deleteMany({}).exec()
      .then(() => {
        const comment = new Comment({
          author: lucyId,
          body: 'comment',
          post: questionId,
        });
        return comment.save();
      })
      .then(saved => {
        resolve(saved._id);
      })
      .catch(reject);
  });
}

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
      Comment.deleteMany({}).exec(),
    ]);
  });

  describe('create comment', () => {
    it('should create a comment for post', done => {
      chai.request(server)
        .post('/comments/create')
        .send({
          author: lucyId,
          body: 'comment',
          post: questionId,
        })
        .end((err, res) => {
          res.should.have.status(200);
          let saved;
          Comment.findById(res.body.comment._id).exec()
            .then(comment => {
              saved = comment;
              assert.strictEqual(comment.body, 'comment');
              return Post.findById(questionId).exec();
            })
            .then(post => {
              assert.strictEqual(post.comments[0].toString(), saved._id.toString());
              done();
            })
            .catch(done);
        });
    });
  });

  describe('get comment', () => {
    let commentId;
    before(done => {
      resetComment(lucyId, questionId)
        .then(id => {
          commentId = id;
          done();
        })
        .catch(done);
    });

    it('should get comment with id', done => {
      chai.request(server)
        .get(`/comments/${commentId}`)
        .end((err, res) => {
          assert.strictEqual(res.body.comment.body, 'comment');
          done();
        });
    });
  });

  describe('update comment', () => {
    let commentId;
    before(done => {
      resetComment(lucyId, questionId)
        .then(id => {
          commentId = id;
          done();
        })
        .catch(done);
    });

    it('should update an earlier comment', done => {
      chai.request(server)
        .put(`/comments/${commentId}`)
        .send({
          body: 'new body',
        })
        .end((err, res) => {
          Comment.findById(commentId).exec()
            .then(comment => {
              assert.strictEqual(comment.body, 'new body');
              done();
            })
            .catch(done);
        });
    });
  });

  describe('delete comment', () => {
    let commentId;
    before(done => {
      resetComment(lucyId, questionId)
        .then(id => {
          commentId = id;
          done();
        })
        .catch(done);
    });

    it('should delete the comment', done => {
      chai.request(server)
        .delete(`/comments/${commentId}`)
        .end((err, res) => {
          Comment.findById(commentId).exec()
            .then(comment => {
              assert.strictEqual(comment, null);
              done();
            })
            .catch(done);
        });
    });
  });
});
