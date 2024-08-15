const getOrderList = require("../service/order.service");

const orderController = require("express").Router();

orderController.post("/", async (req, res) => {
  const orderList = await getOrderList();
  return res.json({ result: true, data: orderList });
});

module.exports = orderController;
