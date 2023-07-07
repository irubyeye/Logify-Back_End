const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name!"],
  },
  surname: {
    type: String,
    required: [true, "User must have a surname!"],
  },
  country: {
    type: String,
    required: [true, "User must have a country!"],
  },
  city: {
    type: String,
    required: [true, "User must have a city!"],
  },
  phone: {
    type: String,
    required: [true, "User must have a phone number!"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  login: {
    type: String,
    required: [true, "User must have a login!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: [true, "User must have a role!"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
