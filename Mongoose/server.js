const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;
const URL =
  "mongodb+srv://rudreshsankpal21:LlUSfYty7rjrlxdj@rudresh.dfldr.mongodb.net/students-database";
// connect to MongoDB

app.get("/", (req, res) => {
  res.send("Hello world");
});
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log(`DataBase connected successfully`);
  } catch (error) {
    console.log(`Something went wrong ${error}`);
  }
};
connectDB();

// Courses Schema
const coursesSchema = new mongoose.Schema(
  {
    name: String,
    enrolledStudents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    ],
  },
  { timestamps: true }
);
// compile course Schema
const Course = mongoose.model("Course", coursesSchema); // Model

// Student schema
const studentSchema = new mongoose.Schema(
  {
    name: String,
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);
// compile student Schema
const Student = mongoose.model("Student", studentSchema); // Model

// Create student
// const createStudents = async () => {
//   try {
//     const newDoc = await Student.create([
//       { name: "Rudresh" },
//       { name: "Hardik" },
//       { name: "Harshal" },
//       { name: "Raj" },
//       { name: "Samarth" },
//     ]);

//     console.log(newDoc);
//   } catch (error) {
//     console.log(error);
//   }
// };
// createStudents();

//Create Course
// const createCourses = async () => {
//   try {
//     const newDoc = await Course.create([
//       { name: "Math 101" },
//       { name: "History 101" },
//       { name: "Science 101" },
//     ]);
//     console.log(newDoc);
//   } catch (error) {
//     console.log(error);
//   }
// };

//**** STUDENT APPLYING TO COURSES
const applyToCourse = async () => {
  try {
    // Step 1:- Find the student
    const foundStudent1 = await Student.findById("68034d1a536339756e108252");
    const foundStudent2 = await Student.findById("68034d1a536339756e10824e");

    // Step 2:- Find the Course
    const foundCourse1 = await Course.findById("68034bb39903b18224347c5f");
    const foundCourse2 = await Course.findById("68034bb39903b18224347c60");

    // Step 3:- Apply to the course (1.Update the student enrolledCourses 2. Update the enrolledStudents on course)

    // Step 4:- Push the course found into the student's enrolledCourse field
    // foundStudent1.enrolledCourses.push(foundCourse1._id);

    foundStudent2.enrolledCourses.push(foundCourse2._id);

    // Step 4:- Push the student found into the course's enrolledStudent field

    // foundCourse1.enrolledStudents.push(foundStudent1._id);

    foundCourse2.enrolledStudents.push(foundStudent2._id);

    // Step 5:- Resave the documents
    await foundCourse2.save();
    await foundStudent2.save();
    console.log(foundStudent2);
    console.log(foundCourse2);
  } catch (error) {
    console.log(error);
  }
};
applyToCourse();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
