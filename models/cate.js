const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sortorder: {
    type: Number,
    default: 0,
  },


  iconname: {
    type: String,
  },
  path: {
    type: String,
  },
  color: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("Cate", categorySchema);
