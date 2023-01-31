const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
      quantity: { type: Number, required: true },
      productImage: { type: String },
      productName: { type: String },
      productPrice: { type: Number },
    }
  ],
  address:  { type: String },
  note:  { type: String },
  phone:  { type: String },
  username:  { type: String },
})


module.exports = mongoose.model("Order", orderSchema);
