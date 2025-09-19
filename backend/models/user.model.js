import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username must not exceed 30 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [6, "Email must be at least 6 characters long"],
    maxlength: [50, "Email must not exceed 50 characters"],
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["teacher", "student"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
