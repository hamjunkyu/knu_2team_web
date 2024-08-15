const getElement = (id) => document.getElementById(id);

const homeButton = getElement("home_button");
const mypageButton = getElement("mypage_button");
const cartButton = getElement("cart_button");

const fetchProductList = async () => {
  // 상품 목록을 API로부터 가져옵니다.
  const fetchResult = await fetch("/api/product", {
    method: "get",
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

const productListWrapper = document.getElementById("product_list_wrapper");

const renderProductList = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    console.log("No products available");
    return;
  }

  productList.forEach((product) => {
    const itemElem = document.createElement("div");
    itemElem.classList.add("product-item");
    itemElem.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">${product.price}원</p>
      <p class="stock">재고: ${product.stock}개</p>
    `;
    itemElem.addEventListener("click", () => move(product.productId));
    productListWrapper.append(itemElem);
  });
};

const move = (id) => {
  window.location.href = `/product/detail?id=${id}`;
};

homeButton.addEventListener("click", async () => {
  window.location.href = "/";
});
mypageButton.addEventListener("click", async () => {
  window.location.href = "/mypage";
});
cartButton.addEventListener("click", async () => {
  window.location.href = "/";
});

renderProductList();
