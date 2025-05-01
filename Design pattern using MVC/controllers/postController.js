const Post = require("../model/postModel");

//Show the create form
const showCreateForm = (req, res) => {
  res.render("createPost");
};
// Create posts list
const createPostList = async (req, res) => {
  const { title, content, author } = req.body;
  await Post.create({
    title,
    content,
    author,
  });
  //redirect to the post list
  res.redirect("/list");
};
//Show posts list
const showPostList = async (req, res) => {
  const posts = await Post.find();
  res.render("list", { posts });
};

module.exports = {
  showCreateForm,
  showPostList,
  createPostList,
};
