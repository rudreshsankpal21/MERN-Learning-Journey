const express = require("express");
const blogsRouter = express.Router();
blogsRouter.route("/").get((req, res) => {
  res.render("blogs", { title: "Blogs Page" });
});

blogsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  res.send(`Accessing blogs with id ${id}`);
});
module.exports = blogsRouter;
