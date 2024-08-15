const productCartWrapper = document.getElementById("product_cart_wrapper");

const productsInCart = localStorage.getItem("cart");
let priceSum = 0;
// 금액 총합 합계 만들기
if (!productsInCart) {
  d;
}

window.addEventListener("DOMContentLoaded", async () => {});

productsInCart.forEach((productInfo) => {
  const itemElem = document.createElement("div");
  itemElem.classList.add("product-item");

  const product = productInfo.product;
  let orderCount = productInfo.orderCount;

  let totalPrice = product.price * orderCount;

  itemElem.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}">
      <h3 onclick=move(${product.productId})>${product.title}</h3>
      <p class="price">${totalPrice}원</p>
      <div class="quantity">수량:<input id="quantity_input" type="number" max="${product.stock}" min="0" value="0"/>(개)</div>
      <button onclick="removeItem(${product.productId})">삭제</button>
    `;
  priceSum += product.price * 3;
  productCartWrapper.append(itemElem);
});

// 제품 이름 클릭 시 상세정보 이동
const move = (id) => {
  window.location.href = `http://localhost:8000/product/detail?id=${id}`;
};

// 구매수량 조정
const purchaseQuantity = document.getElementById("quantity_input");

purchaseQuantity.addEventListener("input", function () {
  let currentValue = parseInt(purchaseQuantity.value);

  if (currentValue > targetProduct.stock) {
    purchaseQuantity.value = targetProduct.stock;
    alert("구매가능 수량을 초과하였습니다.");
  }

  if (currentValue < 0) {
    purchaseQuantity.value = 0;
  }
});

// [구매하기] 버튼 추가
const purchaseButton = document.createElement("button");
purchaseButton.textContent = "구매하기";
purchaseButton.onclick = () => {
  window.location.href = "http://localhost:8000/product";
};
productCartWrapper.append(purchaseButton);

// 상품을 삭제하는 함수
function removeItem(productId) {
  productsInCart.splice(productId, 1);
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  location.reload(); // 페이지 새로고침하여 리스트 업데이트
}
