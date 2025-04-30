const express = require("express");
const path = require("path");
const ejsLayout = require("express-ejs-layouts");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(ejsLayout);
app.set("layout", "layout/main");
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home page",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "contact page",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
  });
});
app.get("/gallery", (req, res) => {
  res.render("gallery", {
    title: "gallery page",
  });
});
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  next(error);
});
app.use((err, req, res, next) => {
  res.render("error", { error: err, title: "Error" });
});
app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
