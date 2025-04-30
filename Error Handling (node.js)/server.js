const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

//?Route to fetch posts
app.get("/posts", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://jsonplace123holder.typicode.com/posts"
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Simulate an error in the middleware
// app.use((req, res, next) => {
//   // Error
//   const isError = true;
//   //   if (isError) {
//   //     //Create an error obj
//   //     const err = new Error("User Not Found");
//   //     next(err);
//   //   } else {
//   //     next();
//   //   }

//   // Using try and catch
//   try {
//     if (isError) {
//       throw new Error("synchronous error occured");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

//Regular route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the home page",
  });
});

// Custom Error handling middleware
app.use((err, req, res, next) => {
  // setting http status code
  //   res.status(err.status || 404);
  //   //   console.log(err.stack);
  //   res.json({
  //     message: err.message,
  //     // stack: err.stack,
  //   });
  // setting http status code for Async
  if (err.response) {
    res.status(err.response.status || 400).json(err.response.data);
  } else if (err.request) {
    res.status(503).json({ message: "Service unavailable" });
  } else {
    res.status(500).json({ message: "Something Broke" });
  }
});

app.listen(PORT, console.log(`http://localhost:${PORT}`));
