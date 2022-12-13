const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: {
    type: String,
    required: "",
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", postSchema);
