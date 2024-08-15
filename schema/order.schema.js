//buyerId: ObjectId

const mongoose = require("../db_init");
const { String } = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      // User 모델에 있는 objectId
      type: String,
      required: true,
    },
    buyer_name: {
      type: String,
      required: true,
    },
    buyer_phone: {
      type: String,
      required: true,
    },
    buyer_email: {
      type: String,
      required: true,
    },
    delivery_name: {
      type: String,
      required: true,
    },
    delivery_address: {
      type: String,
      required: true,
    },
    delivery_phone: {
      type: String,
      required: true,
    },
    products: {
      type: Array, // [ { productId: 1, productTitle: "~"} ,{ productId: 2, productTitle: "~"}, ]
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
