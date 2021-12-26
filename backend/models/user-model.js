const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    identityNumber: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: "0",
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("User", UserSchema, "users");
