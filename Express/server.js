const express = require("express");
const app = express();
const path = require("path");
const ejsLayout = require("express-ejs-layouts");
const aboutRouter = require("./Router/aboutRouter");
const blogsRouter = require("./Router/blogsRouter");
const contactRouter = require("./Router/contactRouter");
const userRouter = require("./Router/userRouter");
app.use(ejsLayout);
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");
app.set("layout", "layout/main");

app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

app.use("/about", aboutRouter);
app.use("/blogs", blogsRouter);
app.use("/contact", contactRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error("New Error Occured");
  next(error);
});
app.use((err, req, res, next) => {
  res.render("error", { title: "Error page", error: err });
});
app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
