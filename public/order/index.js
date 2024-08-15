const submitButton = document.getElementById("submit_button");

const buyerName = document.getElementById("buyer-name");
const buyerPhone = document.getElementById("buyer-phone");
const buyerEmail = document.getElementById("buyer-email");

const deliveryName = document.getElementById("delivery-name");
const address = document.getElementById("address");
const deliveryPhone = document.getElementById("delivery-phone");

window.addEventListener("DOMContentLoaded", async () => {
  const isTokenOk = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token); // 토큰 확인
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
        buyerEmail.value = fetchData.tokenVerify.email;
      } else {
        alert("(!)로그인을 해주세요.");
        window.location.href = "/signin";
      }
    } catch (err) {
      console.log(err);
      alert("(!)에러");
      window.location.href = "/signin";
    }
  };

  isTokenOk();
});

submitButton.addEventListener("click", async () => {
  const products = JSON.parse(window.localStorage.getItem("cart")) || [];

  const order = {
    buyer_name: buyerName.value,
    buyer_phone: buyerPhone.value,
    buyer_email: buyerEmail.value,

    delivery_name: deliveryName.value,
    delivery_address: address.value,
    delivery_phone: deliveryPhone.value,
    products,
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
      console.log(orderResult);
    } else {
      alert("(!)주문정보 저장 실패");
    }
    window.location.href = "/mypage";
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
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>${parseInt(totalPrice, 10).toLocaleString()}원</p>
      <p>수량: ${orderCount}</p>
      <br>
    `;

    totalPriceSum += totalPrice;
    productOrderWrapper.append(itemElem);
  }
  // 총 금액을 표시
  const PriceSum = document.getElementById("total_price");
  PriceSum.innerHTML = `
  <h2>결제정보</h2>
  <p>총결제금액: ${parseInt(totalPriceSum, 10).toLocaleString()}원</p>
  `;
};

renderCart();
