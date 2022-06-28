import mongoose from "mongoose";

const UserShema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserShema);

export default User;
