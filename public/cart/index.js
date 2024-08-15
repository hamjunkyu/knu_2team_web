const productCartWrapper = document.getElementById("product_cart_wrapper");

const productsInCart = localStorage.getItem("cart");
let priceSum = 0;
// 금액 총합 합계 만들기
if (!productsInCart) {
  d;
}

window.addEventListener("DOMContentLoaded", async () => {});

productsInCart.forEach((product) => {
  const itemElem = document.createElement("div");
  itemElem.classList.add("product-item");
  itemElem.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}">
      <h3 onclick=move(${product.productId})>${product.title}</h3>
      <p class="price">${product.price}원</p>
      <div class="quantity">수량:<input id="quantity_input" type="number" max="${product.stock}" min="0" value="0"/>(개)</div>
      <button onclick="removeItem(${index})">삭제</button>
    `;
  priceSum += product.price * 3;
  productCartWrapper.append(itemElem);
});

/*
// 총 금액을 표시할 요소를 추가합니다.
console.log(priceSum);
const totalElem = document.createElement("div");
totalElem.classList.add("total-price");
totalElem.innerHTML = `총 합계: ${priceSum}원`;
productCartWrapper.append(totalElem);

const move = (id) => {
  window.location.href = `http://localhost:8000/product/detail?id=${id}`;
};

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
  window.location.href = "/checkout";
};
productCartWrapper.append(purchaseButton);

// 수량을 업데이트하는 함수
function updateQuantity(index, change) {
  productsInCart[index].quantity += change;
  if (productsInCart[index].quantity < 1) {
    productsInCart[index].quantity = 1;
  }
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  document.getElementById(`quantity-${index}`).textContent =
    productsInCart[index].quantity;
  updateTotalPrice();
}

// 상품을 삭제하는 함수
function removeItem(index) {
  productsInCart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  location.reload(); // 페이지 새로고침하여 리스트 업데이트
}

// 총 금액을 업데이트하는 함수
function updateTotalPrice() {
  let newPriceSum = 0;
  productsInCart.forEach((product) => {
    newPriceSum += product.product.price * product.quantity;
  });
  totalElem.innerHTML = `총 합계: ${newPriceSum}원`;
}
*/
