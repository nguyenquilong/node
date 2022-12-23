const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    default: 0,
  },

  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cate",
    },
  ],
  quantity: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
