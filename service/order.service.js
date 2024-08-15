const Order = require("../schema/order.schema");

const getOrderList = async () => {
  const orderList = await Order.find({});
  return orderList;
};

module.exports = getOrderList;
