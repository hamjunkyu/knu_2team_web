const getElement = (id) => document.getElementById(id);

const basketButton = getElement("basket_button");
const payButton = getElement("pay_button");
const homeButton = getElement("home_button");
const productButton = getElement("product_button");
const cartButton = getElement("cart_button");

const fetchProductList = async () => {
  const fetchResult = await fetch("/api/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (fetchResult.ok) {
    const fetchData = await fetchResult.json();
    return fetchData.data;
  } else {
    console.error("Failed to fetch product list");
    return null;
  }
};

const productDetailWrapper = getElement("product_detail_wrapper");

const renderProductDetail = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    console.log("empty productList");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id");

  const targetProduct = productList.find(
    (product) => product.productId == urlId
  );
  if (!targetProduct) {
    console.error("상품 ID가 없습니다.");
    return;
  }

  productDetailWrapper.innerHTML = `
    <div>
      <img src="${targetProduct.imgUrl}" alt="${targetProduct.title}">
    </div>
    <div>
      <h1>${targetProduct.title}</h1>
      <div class="price">가격: ${targetProduct.price}원</div>
      <div class="stock">재고수량: ${targetProduct.stock}(개)</div>
      <div class="description">[상세설명] ${targetProduct.description}</div>
      <div class="buttons">
        <button id="basket_button">장바구니에 담기</button>
        <button id="pay_button">구매</button>
      </div>
    </div>
  `;

  getElement("basket_button").addEventListener("click", () => {
    window.location.href = "http://localhost:8000";
  });

  getElement("pay_button").addEventListener("click", () => {
    window.location.href = "http://localhost:8000";
  });
};

renderProductDetail();

homeButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8000/home";
});

productButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8000/product";
});

cartButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8000";
});
