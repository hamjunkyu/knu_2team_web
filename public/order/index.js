const submitButton = document.getElementById("submit_button");

const buyerName = document.getElementById("buyer-name");
const buyerPhone = document.getElementById("buyer-phone");
const buyerEmail = document.getElementById("buyer-email");

const deliveryName = document.getElementById("delivery-name");
const address = document.getElementById("address");
const deliveryPhone = document.getElementById("delivery-phone");

submitButton.addEventListener("click", async () => {
  const order = {
    buyer_name: buyerName.value,
    buyer_phone: buyerPhone.value,
    buyer_email: buyerEmail.value,

    delivery_name: deliveryName.value,
    address: address.value,
    delivery_phone: deliveryPhone.value,
  };
  console.log(order);
  try {
    const orderResult = await fetch("/api/order", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (orderResult.ok) {
      alert("주문정보 저장 성공");
    } else {
      alert("(!)주문정보 저장 실패");
    }
  } catch (err) {
    console.error(err);
  }
});

/////////////////////////////////////////////////////////////////////

const productOrderWrapper = document.getElementById("product_order_wrapper");

const renderCart = () => {
  productOrderWrapper.innerHTML = "";
  let totalPriceSum = 0;

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
      <h3>${product.title}</h3>
    // 제품설명 코드 추가
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
    productOrderWrapper.append(itemElem);
  }
  // 총 금액을 표시
  const PriceSum = document.getElementById("total_price");
  PriceSum.innerHTML = `
  <p>합계: ${totalPriceSum}원</p>
  `;
};

renderCart();
