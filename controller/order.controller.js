const purchaseOrder = require("../service/order.service");

const orderController = require("express").Router();

orderController.post("/", async (req, res) => {
  const {
    buyer_name,
    buyer_phone,
    buyer_email,
    delivery_name,
    delivery_address,
    delivery_phone,
    products,
  } = req.body;
  const order = {
    buyer_name,
    buyer_phone,
    buyer_email,
    delivery_name,
    delivery_address,
    delivery_phone,
    products,
  };
  try {
    await purchaseOrder(order);
    return res.status(201).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false });
  }
});

module.exports = orderController;
