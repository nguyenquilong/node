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
  userId: 
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});

module.exports = mongoose.model("Cate", categorySchema);
