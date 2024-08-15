const getElement = (id) => document.getElementById(id);

const basketButton = getElement("basket_button");
const logOutButton = getElement("logout");
const homeButton = getElement("home_button");

const introduce = document.getElementById("introduce");

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.log("Token parsing error:", e);
    return null;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const isTokenOk = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token); // 토큰 확인

      // 토큰 디코드하여 사용자 정보 추출
      const userData = parseJwt(token);
      if (userData) {
        introduce.innerText = `안녕하세요, ${userData.nickname || "사용자"}님!`;
        getElement("email").innerText = `이메일: ${userData.email || "없음"}`;
      } else {
        alert("(!)유효하지 않은 토큰입니다. 다시 로그인해주세요.");
        window.location.href = "/signin";
      }

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

        if (!fetchData.isVerify) {
          alert("(!)계정 정보 불일치");
          window.location.href = "/signin";
          localStorage.removeItem("token");
        }
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

getElement("home_button").addEventListener("click", () => {
  window.location.href = "/";
});
getElement("basket_button").addEventListener("click", () => {
  window.location.href = "/cart";
});
getElement("logout").addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.href = "/";
});

const fetchProductList = async () => {
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

const renderProductList = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    console.log("No products available");
    return;
  }

  const productListWrapper = getElement("product_list_wrapper");
  productList.forEach((product) => {
    const itemElem = document.createElement("div");
    itemElem.classList.add("product-item");
    itemElem.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">${parseInt(product.price, 10).toLocaleString()}원</p>
      <p class="stock">재고: ${product.stock}개</p>
    `;
    itemElem.addEventListener("click", () => move(product.productId));
    productListWrapper.append(itemElem);
  });

  // 자동 스크롤
  let scrollAmount = 0;
  const scrollStep = 1; // 한 번에 스크롤할 픽셀 수
  const maxScroll =
    productListWrapper.scrollWidth - productListWrapper.clientWidth;

  setInterval(() => {
    productListWrapper.scrollLeft = scrollAmount;
    scrollAmount += scrollStep;
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0; // 끝에 도달하면 처음으로 돌아감
    }
  }, 50); // 스크롤 속도 조정
};

const move = (id) => {
  window.location.href = `/product/detail?id=${id}`;
};

document.addEventListener("DOMContentLoaded", () => {
  renderProductList();
});
