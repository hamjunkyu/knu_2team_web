const productController = require("express").Router();

const dummydData = Array.from({ length: 30 }, (_, index) => {
  const product = {
    title: `"product-title-${index + 1}"`,
    price: Math.floor(Math.random() * 90000) + 10000,
    description: `product-description-${index + 1}`,
    imgUrl: `http://picsum.photos/id/${index + 1}/200/300`,
    stock: Math.ceil(Math.random() * 100),
  };
  return product;
});
// 상품조회 api
// 1) 전체 싹다 뽑는다.
// 2) 필터(조건)를 적용한다.
// 3) 페이지네이션 적용
productController.get("/", (req, res) => {
  return res.json({ result: true, data: dummydData });
});
module.exports = productController;
