const { getProductList } = require("../public/product/product.service");
const product = require("../schema/product.schema");
const productController = require("express").Router();

// 상품 조회 API
// 1) 전체 싹 다 뽑기
// 2) 필터(조건)를 적용
// 3) 페이지네이션 적용
productController.get("/", (req, res) => {
  //상품 전체 조회
  // 가져온 데이터를 res.json({})에 실어서 클라이언트로 보내준다.
  const productList = getProductList;
  return res.json({ result: true, data: [] });
});
productList.productId;
module.exports = productController;
