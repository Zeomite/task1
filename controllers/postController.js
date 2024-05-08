const Post = require("../models/postModel");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const Comment = require("../models/commentModel");
const { response } = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const create = async (req, res) => {
  try {
    let post = {
      postid: uuidv4(),
    };
    if (!req.body.userid) {
      return res.status(401).json({message:"Enter Valid User"});
    }

    if (!req.body.caption && !req.file){
        return res.status(422).json({ message: 'Enter Content to post'})
    }
    let config = null;

    if (req.file) {
      const content = req.file.buffer.toString("base64");
      const data = JSON.stringify({
        message: "file uploaded",
        content: content,
      });

      const newFileName = uuidv4() + "." + req.file.originalname.split(".").slice(-1)[0];
      console.log(newFileName)
      const config = {
        method: "put",
        url: `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${newFileName}`,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          'Accept': 'application/vnd.github.v3+json'
        },
        data: data
    }
      const response = await axios(config);
      if (response.status === 201) {
        const link = `https://raw.githubusercontent.com/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/main/${newFileName}`;
        post.images = link;
      }
    }

    if (req.body.caption) {
      post.caption = req.body.caption;
    }
    post.owner = req.body.userid;
    console.log(post);

    let axiosPromise = config ? axios(config) : Promise.resolve(null);
    const [githubResponse, savedFile] = await Promise.all([
      axiosPromise,
      Post.create(post),
    ]);
    if (githubResponse && githubResponse.status !== 201) {
      throw new Error(
        `GitHub API request failed with status ${githubResponse.status}`
      );
    }

    return res.status(200).json({
      message: "success",
      post: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failure" });
  }
};

const update = async (req, res) => {
  try {
    const postid = req.body.postid;
    const userid = req.body.userid;
    let postUpdate = {};
    let isFileUploaded = false
    if (req.file){
        isFileUploaded = true;
    }

    const fileUploadPromise = isFileUploaded
      ? uploadFile(req)
      : Promise.resolve();

    const [fileUploadResponse] = await Promise.all([
      fileUploadPromise,
      updateCaption(req, postUpdate),
    ]);

    if (fileUploadResponse && fileUploadResponse.status === 201) {
      postUpdate.images = fileUploadResponse.link;
    }

    const post = await Post.findOne({ postid: postid });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.owner !== userid) {
      return res.status(403).json({
        message:
          "Unauthorized: User does not have permission to update this post",
      });
    }

    if (req.body.caption) {
      postUpdate.caption = req.body.caption;
    }

    const updatedPost = await Post.findOneAndUpdate(
      { postid: postid },
      postUpdate,
      { new: true }
    );

    return res.status(200).json({
      message: "success",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failure" });
  }
};

const uploadFile = async (req) => {
  const content = req.file.buffer.toString("base64");
  const data = JSON.stringify({
    message: "file uploaded",
    content: content,
  });

  const newFileName = `${uuidv4()}-${req.file.originalname}`;
  const config = {
    method: "put",
    url: `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${newFileName}`,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    data: data,
  };

  return axios(config);
};

const updateCaption = async (req, postUpdate) => {
  if (req.body.caption) {
    postUpdate["caption"] = req.body.caption;
  }
};

const read = async (req, res) => {
  try {
    const { postid, userid } = req.body;
    let query = {};

    if (postid) {
      query = { postid: postid };
    } else if (userid) {
      query = { owner: userid };
    }

    const posts = await Post.find(query).populate("comments");
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({
      message: "success",
      posts: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failure" });
  }
};

const remove = async (req, res) => {
  try {
    const postid = req.body.postid;
    const userid = req.body.userid;
    const post = await Post.findOne({ postid: postid });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.owner !== userid) {
      return res.status(403).json({
        message:
          "Unauthorized: User does not have permission to delete this post",
      });
    }
    const [deletedPost, deleteComments] = await Promise.all([
      Post.findOneAndDelete({ postid: postid }),
      Comment.deleteMany({ postid: postid }),
    ]);
    return res.status(200).json({
      message: "success",
      post: deletedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failure" });
  }
};

const like = async (req, res) => {
  try {
    let response = {};
    const { userid, postid } = req.body;
    const post = await Post.findOne({ postid: postid });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const index = post.likes.indexOf(userid);
    if (index === -1) {
      post.likes.push(userid);
      response.message = "Liked!";
    } else {
      post.likes.splice(index, 1);
      response.message = "Unliked!";
    }

    await post.save();
    response.post = post;

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failure" });
  }
};

module.exports = { create, update, read, remove, like , upload};
