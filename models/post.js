const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
  
  // price: {
  //   type: Number,
  //   default: 0,
  // },
  // category: {
  //   type: Number,
  //   default: 0,
  // },
  // quantity: {
  //   type: Number,
  //   default: 0,
  // },
});

module.exports = mongoose.model("Post", postSchema);
