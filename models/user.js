const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: false,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "I am new!",
  },
  role: {
    type: String,
    default: "guest",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
