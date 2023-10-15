const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  salt: {
    type: String,
    required: [true, "Salt is required"],
  },
  phonenumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", userSchema);
