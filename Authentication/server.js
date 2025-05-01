const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PORT = 3000;

// connect to mongoose
mongoose
  .connect(
    "mongodb+srv://rudreshsankpal21:LlUSfYty7rjrlxdj@rudresh.dfldr.mongodb.net/Rudresh-database"
  )
  .then(console.log("DB has been connected"))
  .catch((e) => {
    console.log(e);
  });

// create the user schema
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//compile the schema to form model
const User = mongoose.model("User", userSchema);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom middlewares
//isAuthenticated middleware
const isAuthenticated = (req, res, next) => {
  //Access the token from the req.cookies
  const token = req.cookies ? req.cookies.token : null;
  // redirect
  if (!token) {
    return res.redirect("/login");
  }
  // verify the token
  jwt.verify(token, "anykey", (e, decoded) => {
    console.log(e);

    if (e) return res.redirect("/login");
    console.log(decoded);
    // Add the user into the req obj
    req.userData = decoded;
    next();
  });
};

//Is Admin middleware for authorization
const isAdmin = (req, res, next) => {};

//Configure express session
// app.use(
//   session({
//     secret: "rudresh123",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60 * 60 * 1000, // Expires in one hour
//     },
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://rudreshsankpal21:LlUSfYty7rjrlxdj@rudresh.dfldr.mongodb.net/Rudresh-database",
//     }),
//   })
// );

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Register route
app.get("/register", (req, res) => {
  res.render("register");
});

//Admin Route
app.get("/admin-only", isAuthenticated, isAdmin, (req, res) => {
  // we have access to the login user as req.userData
  res.render("admin");
});

//Register logic
app.post("/register", async (req, res) => {
  //Destructure the req.body
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      username,
      password: hashedPass,
    });
    // Redirect user to login
    res.redirect("login");
  } catch (error) {}
});

app.post("/login", async (req, res) => {
  // 1. Find the user in the DB
  const { username, password } = req.body;
  const userFound = await User.findOne({
    username,
  });
  // 2. Create some cookies
  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    //Generate the token
    const token = jwt.sign(
      {
        username: userFound.username,
        role: userFound.role,
      },
      "anykey",
      {
        expiresIn: "3d",
      }
    );
    // Save the token into the cookie
    res.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    console.log(token);
    res.redirect("/dashboard");
  } else {
    res.send("Invalid login credentials");
  }
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  // Take the login user from the req obj
  const username = req.userData ? req.userData.username : null;
  if (username) {
    res.render("dashboard"), { username };
  } else {
    // redirect
    res.redirect("/login");
  }
  // console.log(req.userData);
});

app.get("/logout", (req, res) => {
  // logout
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
