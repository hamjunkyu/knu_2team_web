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
          window.location.href = "http://localhost:8000/signin";
          localStorage.removeItem("token");
        }
      } else {
        alert("(!)로그인 후 이용해주세요.");
        //window.location.href = "http://localhost:8000/signin";
      }
    } catch (err) {
      console.log(err);
      alert("(!)에러");
      window.location.href = "http://localhost:8000/signin";
    }
  };
  isTokenOk();
});

orderButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8000/order";
});

function move(target) {
  const idValue = target.id;
  window.location.href = `http://localhost:8000/product/detail?id=${idValue}`;
}

homeButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8000";
});

productButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8000/product";
});

cartButton.addEventListener("click", () => {
  window.location.href = "http://localhost:8000/cart";
});
