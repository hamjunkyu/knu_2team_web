const getOrderList = require("../service/order.service");

const orderController = require("express").Router();

orderController.post("/", async (req, res) => {
  const {
    buyer_name,
    buyer_phone,
    buyer_email,
    delivery_name,
    address,
    delivery_phone,
  } = req.body;

  const orderList = await getOrderList();
  return res.json({ result: true, data: orderList });
});

module.exports = orderController;
