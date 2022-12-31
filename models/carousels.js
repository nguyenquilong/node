const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carouselsSchema = new Schema({
  carouselUrl: {
    type: String,
    require: false,
  },
  redirectUrl: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Carousels", carouselsSchema);
