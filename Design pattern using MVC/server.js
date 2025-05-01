const express = require("express");
const app = express();
//-----Connect DB------
const mongoose = require("mongoose");
const postRouter = require("./routes/blogRoutes");
mongoose
  .connect(
    "mongodbURL"
  )
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((e) => {
    console.log(e);
  });
const PORT = 3000;
//!Configure ejs
app.set("view engine", "ejs");
//!Middlewares
app.use(express.urlencoded({ extended: true })); // middleware to pass JSON data

//!. Show Homepage
app.get("/", (req, res) => {
  res.render("index");
});
//Router
app.use("/", postRouter);
//Start the server
app.listen(PORT, console.log(`The server is running on port ${PORT}`));
