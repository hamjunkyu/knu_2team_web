//buyerId: ObjectId

const mongoose = require("../db_init");
const { String, Number } = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema(
  {
    buyer_name: {
      type: Number,
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
    address: {
      type: String,
      required: true,
    },
    delivery_phone: {
      type: String,
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
