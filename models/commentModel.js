const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentid: {
        type: String,
        required: true,
        unique: true
    },
  postid: {
    type: String,
    ref: 'Post',
    required: true
  },
  userid: {
    type: String,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
