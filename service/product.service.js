const Product = require("../schema/product.schema");

const getProductList = async () => {
  // Product 모델을 통해 , MongoDB에서 데이터를 가져와야함
  const productList = await Product.find({});
  return productList;
};

const getProductData = async (foundproductId) => {
  // Product 모델을 통해 , MongoDB에서 데이터를 가져와야함
  const productData = await Product.findOne({ productId: foundproductId });
  return productData;
};

module.exports = {
  getProductList,
  getProductData,
};
