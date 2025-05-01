require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
// connect to DB
mongoose
  .connect(
    "mongodb+srv://rudreshsankpal21:LlUSfYty7rjrlxdj@rudresh.dfldr.mongodb.net/image-upload"
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log(e);
  });

//Image Schema
const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});
//Model
const image = mongoose.model("Image", imageSchema);
// Configure cloudinary
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configure multer-storage cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images-folder",
    format: async (req, file) => "png",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [
      {
        width: 800,
        height: 600,
        crop: "fill",
      },
    ],
  },
});
//Configure multer
const upload = multer({
  storage,
  limits: 1024 * 1020 * 5, // 5mb limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("not an image", false));
    }
  },
});

//Upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  const uploaded = await image.create({
    url: req.file.path,
    public_id: req.file.filename,
  });

  res.json({
    message: "File uploaded",
    uploaded,
  });
});
// Get all images
app.get("/images", async (req, res) => {
  try {
    const images = await image.find();
    res.json({ images });
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, console.log(`http://localhost:${port}`));
