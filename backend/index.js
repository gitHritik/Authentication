import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./model/user.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/RegisterorLogin",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("DB connected");
  }
);

//routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Succefully login", user });
      } else {
        res.send({ message: "Password doesn't match" });
      }
    } else {
      res.send({ message: "User not exist" });
    }
  });
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User alread exist" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Succeccfull registered : Please login Now" });
        }
      });
    }
  });
});
app.listen(8000, () => {
  console.log("app is listening on 8000");
});
