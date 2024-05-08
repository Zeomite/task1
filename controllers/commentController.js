const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const { v4: uuidv4 } = require("uuid");

const create = async (req, res) => {
  try {
    const { postid, userid, content } = req.body;
    if(!postid || !userid || !content){
        return res.status(400).json({
            message: "Add all fields"
          });
    }
    let commentid = uuidv4()
    const comment = new Comment({
      commentid,   
      postid,
      userid,
      content
    });
    await comment.save();
    await Post.findOneAndUpdate({postid: postid}, { $push: { comments: commentid } });
    return res.status(201).json({
      message: "Comment created successfully",
      comment: comment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create comment" });
  }
};


  const update = async (req, res) => {
    try {
      const { commentid, userid, content } = req.body;
  
      const comment = await Comment.findOne({commentid: commentid});
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.userid.toString() !== userid) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      comment.content = content;
      await comment.save();
  
      return res.status(200).json({
        message: "Comment updated successfully",
        comment: comment
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update comment" });
    }
  };

  const remove = async (req, res) => {
    try {
      const { commentid, userid } = req.body;
      const comment = await Comment.findOne({commentid: commentid});
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      if (comment.userid.toString() !== userid) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
  
      await Comment.findOneAndDelete({commentid: commentid})
  
      return res.status(200).json({
        message: "Comment deleted successfully",
        comment: comment
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete comment" });
    }
  };
  
  module.exports = {create, remove, update };
  