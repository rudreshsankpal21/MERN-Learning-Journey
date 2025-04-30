const express = require("express");
const userRouter = express.Router();
userRouter.route("/").get((req, res) => {
  res.render("user", { title: "Users Page" });
});

userRouter.route("/:id").get((req, res) => {
  res.send(`Accessing the users using id ${id}`);
});

module.exports = userRouter;
