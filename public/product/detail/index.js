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
const productDetailWrapper = document.getElementById("product_detail_wrapper");

const renderProductList = async () => {
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
      <div class="quantity">구매수량:<input id="quantity_input" type="number" max="${targetProduct.stock}" min="0" value="0"/>(개)</div>
      <div class="description">[상세설명] ${targetProduct.description}</div>
      <div class="buttons">
        <button id="basket_button">장바구니에 담기</button>
        <button id="pay_button">구매</button>
      </div>
    </div>
  `;

  const orderCount = document.getElementById("quantity_input");

  orderCount.addEventListener("input", function () {
    let currentValue = parseInt(orderCount.value);

    if (currentValue > targetProduct.stock) {
      orderCount.value = targetProduct.stock;
      alert("구매가능 수량을 초과하였습니다.");
    }

    if (currentValue < 0) {
      orderCount.value = 0;
    }
  });

  getElement("basket_button").addEventListener("click", () => {
    const existingCart = JSON.parse(window.localStorage.getItem("cart")) || [];

    const newProduct = {
      product: {
        id: targetProduct.productId, // 각 제품의 고유 ID
        title: targetProduct.title,
        price: targetProduct.price,
        imgUrl: targetProduct.imgUrl,
        description: targetProduct.description,
        stock: targetProduct.stock,
      },
      orderCount: parseInt(orderCount.value), // 사용자가 입력한 수량
    };

    const existingProductIndex = existingCart.findIndex(
      (item) => item.product.id === newProduct.product.id
    );

    if (existingProductIndex !== -1) {
      // 동일한 제품이 이미 장바구니에 있으면 수량을 업데이트
      existingCart[existingProductIndex].orderCount += newProduct.orderCount;
    } else {
      // 동일한 제품이 없으면 새로운 객체로 추가
      existingCart.push(newProduct);
    }

    // 로컬 스토리지에 업데이트된 장바구니 저장
    window.localStorage.setItem("cart", JSON.stringify(existingCart));
    console.log("장바구니에 상품이 추가되었습니다.");
    alert("장바구니에 담겼습니다.");
  });

  getElement("pay_button").addEventListener("click", () => {
    window.location.href = "http://localhost:8000/cart";
  });
};

renderProductList();

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

cartButton.addEventListener("click", () => {});
