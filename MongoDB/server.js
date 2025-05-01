// mongoDB password = LlUSfYty7rjrlxdj
// mongoDB username = rudreshsankpal21
// mongoDB url = mongodb+srv://rudreshsankpal21:LlUSfYty7rjrlxdj@rudresh.dfldr.mongodb.net/students-database
// function to connect
const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 3000;

// connect to mongoDB
const client = new MongoClient(
  "mongodbURL", // url created on the mongoDB website
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
    // 1.Database name (School)
    const database = client.db("rudresh");
    // 2.Collections (students)
    const students = database.collection("students");
    // 3.Documents() using the insertOne
    // const result = await students.insertOne({
    //   name: "Rudresh",
    //   age: 19,
    //   subjects: ["maths", "C++", "Electronics"],
    // });
    // 3.Documents() using the insertMany
    const result = await students.insertMany([
      {
        name: "rudresh",
        age: 18,
        grade: "B",
        pass: "False",
        subject: ["Computer Science", "Data structure", "Operating System"],
      },
      {
        name: "Hardik",
        age: 8,
        grade: "B",
        pass: "True",
        subject: [" Science", "Maths ", " English"],
      },
      {
        name: "Neha",
        age: 17,
        grade: "A",
        pass: "True",
        subject: [" Accounts", "English ", " Marketing"],
      },
    ]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
// call the function
connectDB();
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
