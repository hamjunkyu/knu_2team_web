const product = require("../schema/product.schema");

const getProductList = async (product) => {
  //'Product' 모델을 통해, MongoDB에서 데이터를 가져와야 함.
  try {
    const productList = await product.find({});

    return productList;
  } catch (err) {}
};

module.exports = {
  getProductList,
};
