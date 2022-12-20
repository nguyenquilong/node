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
  status: {
    type: Boolean,
    default: true,
  },
  iconname: {
    type: String,
    default: "",
  },
  path: {
    type: String,
    default: "/",
  },
  color: {
    type: String,
    default: "#000",
  },
  userId: 
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});

module.exports = mongoose.model("Cate", categorySchema);
