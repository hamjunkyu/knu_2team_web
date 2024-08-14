const Product = require("../schema/product.schema");

const getProductList = async () => {
  // Product 모델을 통해 , MongoDB에서 데이터를 가져와야함
  const productList = await Product.find({});
  return productList;
};

module.exports = getProductList;
