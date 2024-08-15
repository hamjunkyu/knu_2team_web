const Order = require("../schema/order.schema");
const { getUserByEmail } = require("./user.service");
// const getOrder = require("../controller/order.controller");

const purchaseOrder = async (orderReq) => {
  console.log("orderReq", orderReq);
  try {
    const user = await getUserByEmail(orderReq.buyer_email);
    const order = {
      buyerId: user._id.toString(),
      buyer_name: orderReq.buyer_name,
      buyer_phone: orderReq.buyer_phone,
      buyer_email: orderReq.buyer_email,
      delivery_name: orderReq.delivery_name,
      delivery_address: orderReq.delivery_address,
      delivery_phone: orderReq.delivery_phone,
      products: orderReq.products,
    };
    console.log(order);
    const sentOrder = await Order.create(order);
    console.log(sentOrder);
  } catch (err) {
    console.log(err);
  }
};

module.exports = purchaseOrder;
