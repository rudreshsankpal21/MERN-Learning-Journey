const express = require("express");
const aboutRouter = express.Router();
aboutRouter.route("/").get((req, res) => {
  res.render("about", { title: "About page" });
});
aboutRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  res.send(`Accessing about using id ${id}`);
});
module.exports = aboutRouter;
