const Order = require("../schema/order.schema");
const getOrder = require("../controller/order.controller");

const getOrderList = async () => {
  const orderList = await Order.find({});

  return orderList;
};

module.exports = getOrderList;
