const express = require("express");
const contactRouter = express.Router();
contactRouter.route("/").get((req, res) => {
  res.render("contact", { title: "Contact Page" });
});

contactRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  res.send(`Accessing contact with id ${id}`);
});
module.exports = contactRouter;
