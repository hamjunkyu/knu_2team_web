const basketButton = document.getElementById("basket_button");
const payButton = document.getElementById("pay_button");

const fetchProductList = async () => {
  // product.controller와의 통신을 통해 'product' 가져옴
  const fetchResult = await fetch("/api/product", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (fetchResult.ok) {
    const fetchData = await fetchResult.json();
    // fetch Data -> { result: true, data: [] }
    console.log(fetchData);
    return fetchData.data;
  } else {
    return null;
  }
};

const productDetailWrapper = document.getElementById("product_detail_wrapper");

const renderProductDetail = async () => {
  const productList = await fetchProductList();
  // productList -> [] or null
  if (!productList || productList.length === 0) {
    console.log("empty productList");
    return;
  }
  // productList가 존재하는 경우
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id");
  console.log("URL ID:", urlId);
  const targetProduct = productList.find((product) => {
    console.log("Product ID:", product.productId);
    return product.productId == urlId;
  });
  console.log("Found Product:", targetProduct);
  if (!targetProduct) {
    console.error("상품 ID가 없습니다.");
    return;
  }
  productDetailWrapper.innerHTML = `
        <h1>${targetProduct.title}</h1>
        <div>가격: ${targetProduct.price}원</div>
        <div>[상세설명] ${targetProduct.description}</div>
        <div>
          <img src="${targetProduct.imgUrl}" alt="${targetProduct.title}" />
        </div>
        <div>재고수량: ${targetProduct.stock}(개)</div>
    `;
};

renderProductDetail();

basketButton.addEventListener("click", async () => {
  window.location.href = "http://localhost:8000";
});

payButton.addEventListener("click", async () => {
  window.location.href = "http://localhost:8000";
});
