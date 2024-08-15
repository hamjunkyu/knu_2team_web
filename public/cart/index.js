const homeButton = document.getElementById("home_button");
const productButton = document.getElementById("product_button");
const cartButton = document.getElementById("cart_button");
const orderButton = document.getElementById("order_button");

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  console.log("토큰", token);
  const isTokenOk = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("토큰", token);
      const fetchResult = await fetch("/api/user/token", {
        method: "post",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (fetchResult.ok) {
        const fetchData = await fetchResult.json();
        console.log(fetchData);
        //토큰불일치(로그인페이지 이동)
        if (!fetchData.isVerify) {
          alert("(!)계정 정보 불일치");
          window.location.href = "/signin";
          localStorage.removeItem("token");
        }
      } else {
        alert("(!)로그인 후 이용해주세요.");
        //window.location.href = "http://localhost:8000/signin";
      }
    } catch (err) {
      console.log(err);
      alert("(!)에러");
      window.location.href = "/signin";
    }
  };
  isTokenOk();
});

orderButton.addEventListener("click", () => {
  window.location.href = "/order";
});

homeButton.addEventListener("click", () => {
  window.location.href = "/";
});

productButton.addEventListener("click", () => {
  window.location.href = "/product";
});

cartButton.addEventListener("click", () => {
  window.location.href = "/cart";
});

///////////////////////////////////////////////////////////////////////////////////////////

const productCartWrapper = document.getElementById("product_cart_wrapper");
let totalPriceSum = 0;

const renderCart = () => {
  const productsInCart = localStorage.getItem("cart");

  // 장바구니가 비어있을 때
  if (!productsInCart) {
    alert("장바구니에 제품이 없습니다.");
    window.location.href = `/product`;
  }

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
      <p>수량: 
            <button onclick="updateQuantity(${orderCount}, -1)">-</button>
            <span id="quantity-${product.productId}">${orderCount}</span>
            <button onclick="updateQuantity(${orderCount}, 1)">+</button>
      </p>
      <button onclick="removeItem(${product.productId})">삭제</button>
    `;

    totalPriceSum += totalPrice;
    productCartWrapper.append(itemElem);
  });
};

renderCart();

// 총 금액을 표시할 요소를 추가합니다.
console.log(totalPriceSum);
const totalElem = document.createElement("div");
totalElem.classList.add("total-price");
totalElem.innerHTML = `총 합계: ${totalPriceSum}원`;

// 제품 이름 클릭 시 상세정보 이동
const move = (id) => {
  window.location.href = `/product/detail?id=${id}`;
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

// 상품을 삭제하는 함수 !!!고쳐야함!!!
function removeItem(productId) {
  productsInCart.splice(productId, 1);
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  location.reload(); // 페이지 새로고침하여 리스트 업데이트
}

// 총 금액을 업데이트하는 함수 !!!고쳐야함!!!
function updateTotalPrice() {
  let newPriceSum = 0;
  productsInCart.forEach((product) => {
    newPriceSum += product.product.price * product.quantity;
  });
  totalElem.innerHTML = `총 합계: ${newPriceSum}원`;
}
