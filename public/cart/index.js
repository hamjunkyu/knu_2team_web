const homeButton = document.getElementById("home_button");
const productButton = document.getElementById("product_button");
const cartButton = document.getElementById("cart_button");
const orderButton = document.getElementById("order_button");

/*
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
        //window.location.href = "/signin";
      }
    } catch (err) {
      console.log(err);
      alert("(!)에러");
      window.location.href = "/signin";
    }
  };
  isTokenOk();
});
*/

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
  productCartWrapper.innerHTML = "";

  const productsInCart = JSON.parse(window.localStorage.getItem("cart")) || [];

  console.log(productsInCart);
  // 장바구니가 비어있을 때
  if (productsInCart.length == 0) {
    alert("장바구니에 제품이 없습니다.");
    window.location.href = `/product`;
  }

  for (let i = 0; i < productsInCart.length; i++) {
    const productInfo = productsInCart[i];
    console.log(productInfo);

    const itemElem = document.createElement("div");
    itemElem.classList.add("product-item");

    const product = productInfo.product;
    let orderCount = productInfo.orderCount;

    let totalPrice = product.price * orderCount;

    itemElem.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}">
      <h3 onclick=move(${product.productId})>${product.title}</h3>
      <p class="price">${parseInt(totalPrice, 10).toLocaleString()}원</p>
      <p>수량: 
            <button onclick="updateQuantity(${
              product.productId
            }, ${orderCount}, -1)">-</button>
            <span id="quantity-${product.productId}">${orderCount}</span>
            <button onclick="updateQuantity(${
              product.productId
            }, ${orderCount}, 1)">+</button>
      </p>
      <button onclick="removeItem(${product.productId})">삭제</button>
    `;

    totalPriceSum += totalPrice;
    productCartWrapper.append(itemElem);
  }
  const PriceSum = document.getElementById("total_price");
  PriceSum.innerHTML = `
  <p>합계: ${totalPriceSum}원</p>
  `;
};

renderCart();

// 총 금액을 표시할 요소를 추가합니다.
console.log(totalPriceSum);

// 제품 이름 클릭 시 상세정보 이동
const move = (id) => {
  window.location.href = `/product/detail?id=${id}`;
};

// 수량을 업데이트하는 함수
function updateQuantity(productId, count, change) {
  // 로컬 스토리지에 업데이트된 장바구니 저장
  const updateStorage = (existingCart) => {
    window.localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  changedCount = count + change;
  // 구매수량 0 이하 불가
  if (changedCount == 0) {
    return;
  }
  const existingCart = JSON.parse(window.localStorage.getItem("cart")) || [];

  // 해당 제품 찾기
  const existingProductIndex = existingCart.findIndex(
    (item) => item.product.productId === productId
  );

  // 제품이 없으면 에러
  if (existingProductIndex == -1) {
    alert("(Error)삭제 실패");
  }
  // 제품이 있으면 수량 변경
  else {
    // 구매수량 재고수량 이상 불가
    if (changedCount > existingCart[existingProductIndex].product.stock) {
      return;
    } else {
      existingCart[existingProductIndex].orderCount = changedCount;
      updateStorage(existingCart);
      renderCart(); // 리스트 업데이트
    }
  }
}

// 상품을 삭제하는 함수
function removeItem(productId) {
  // 로컬 스토리지에 업데이트된 장바구니 저장
  const updateStorage = (existingCart) => {
    window.localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log("장바구니에서 상품이 삭제되었습니다.");
    alert("삭제되었습니다.");
  };
  const existingCart = JSON.parse(window.localStorage.getItem("cart")) || [];

  // 해당 제품이 localstorage에 있는지 없는지
  const existingProductIndex = existingCart.findIndex(
    (item) => item.product.productId === productId
  );

  // 제품이 없으면 에러
  if (existingProductIndex == -1) {
    alert("(Error)삭제 실패");
  }
  // 제품이 있으면 삭제
  else {
    existingCart.splice(existingProductIndex, 1);
    updateStorage(existingCart);
    renderCart(); // 리스트 업데이트
  }
}
