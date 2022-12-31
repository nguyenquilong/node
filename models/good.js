const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goodsSchema = new Schema({
  goodsCoverImg: {
    type: String,
    require: true,
  },
  goodsIntro: {
    type: String,
    require: false,
  },
  goodsName: {
    type: String,
    require: false,
  },
  sellingPrice: {
    type: Number,
    require: false,
  },
  category: {
    type: String,
    require: false,
  },
  tag: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Good", goodsSchema);
