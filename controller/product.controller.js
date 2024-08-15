// const multerUpload = require("../utils/multer");

const {
  getProductList,
  getProductData,
} = require("../service/product.service");

const productController = require("express").Router();

// 상품 조회 API
// 1) 전체 싹 다 뽑기
// 2) 필터(조건)를 적용
// 3) 페이지네이션 적용

productController.get("/", async (req, res) => {
  // 상품 전체 조회
  // 가져온 데이터를 res.json({})에 실어서 클라이언트로 보내준다
  const productList = await getProductList();
  return res.json({ result: true, data: productList });
});

// 특정 제품 조회
productController.get("/:id", async (req, res) => {
  const { id } = req.params;
  // 가져온 productId를 사용해 제품 데이터를 조회합니다.
  const productData = await getProductData(id);
  return res.json({ result: true, data: productData });
});

module.exports = productController;
