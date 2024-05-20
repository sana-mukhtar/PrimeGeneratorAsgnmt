const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const User = require("./DbModels/userModel");
const PrimeRecord = require("./DbModels/primeNumberdata");

const app = express();
const port = 8000;

//Middlewares
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "anyrandomstring",
  })
);
app.use(cors());
app.use(express.json());

//database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/PrimeGenerator")
  .then(() => console.log("mongodb connected"));

//login route
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }
    const user = new User({ email, password });
    await user.save();
    res.send("Signup successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.send("Login successful!");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in login");
  }
});

// Prime number generation route
app.post("/", async (req, res) => {
  console.log(req.body);
  const { startTime, endTime, timeElapsed, method, primesReturned } = req.body;

  const primeRecord = await new PrimeRecord({
    userId: req.session.userId,
    start: startTime,
    end: endTime,
    timeElapsed,
    algorithm: method,
    numberOfPrimes: primesReturned,
  });
  await primeRecord.save();
  res.status(200).json({ timeElapsed });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
