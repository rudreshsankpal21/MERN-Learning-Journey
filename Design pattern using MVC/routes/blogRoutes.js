const express = require("express");
const mongoose = require("mongoose");
const {
  showCreateForm,
  showPostList,
  createPostList,
} = require("../controllers/postController");
const postRouter = express.Router();

//! Show the create form
postRouter.get("/create", showCreateForm);
//! To get all posts
postRouter.get("/list", showPostList);
//! Create the post (The main logic)
postRouter.post("/create", createPostList);

module.exports = postRouter;
