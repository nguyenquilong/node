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
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Post',
        },
        quantity: { type: Number, required: true },
        productImage: { type: String },
        productName: { type: String},
        productPrice: { type: Number},
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    // console.log('cp', cp)
    // console.log('cp.productId.toString() === product._id.toString();', cp.productId.toString() === product._id.toString())
    return cp.productId.toString() === product._id.toString();
  });
  // console.log('cartProductIndex', cartProductIndex)
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      productImage : product.imageUrl,
      productPrice: product.price,
      productName: product.title,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};


module.exports = mongoose.model("User", userSchema);
