const getElement = (id) => document.getElementById(id);

const basketButton = getElement("basket_button");
const orderButton = getElement("order_button");
const homeButton = getElement("home_button");
const productButton = getElement("product_button");
const cartButton = getElement("cart_button");

const fetchProductData = async (productId) => {
  const fetchResult = await fetch(`/api/product/${productId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (fetchResult.ok) {
    const fetchData = await fetchResult.json();
    console.log(fetchData.data);
    return fetchData.data;
  } else {
    console.error("Failed to fetch product data");
    return null;
  }
};
const productDetailWrapper = document.getElementById("product_detail_wrapper");

const renderProductList = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id");

  const productData = await fetchProductData(urlId);
  if (!productData) {
    console.log("empty productData");
    return;
  }

  const targetProduct = productData;
  console.log("targetProduct: ", targetProduct);

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
      <div class="price">가격: 
        ${parseInt(targetProduct.price, 10).toLocaleString()}원
      </div>
      <div class="stock">재고수량: ${targetProduct.stock}(개)</div>
      <div class="quantity">
      구매수량:<input id="quantity_input" type="number" max="${
        targetProduct.stock
      }" min="0" value="0"/>
      (개)</div>
      <div class="description">[상세설명] ${targetProduct.description}</div>
      <div class="buttons">
        <button id="basket_button">장바구니에 담기</button>
        <button id="order_button">구매</button>
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

  // 장바구니 담기 버튼
  getElement("basket_button").addEventListener("click", () => {
    // 로컬 스토리지에 업데이트된 장바구니 저장
    const updateStorage = (existingCart) => {
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
      console.log("장바구니에 상품이 추가되었습니다.");
      alert("장바구니에 담겼습니다.");
    };
    // 구매수량이 0일 때
    if (orderCount.value == 0) {
      console.log("orderCount: ", orderCount.value);
      alert("수량을 입력해주세요.");
    } else {
      console.log("orderCount: ", orderCount.value);
      const existingCart =
        JSON.parse(window.localStorage.getItem("cart")) || [];

      const newProduct = {
        product: targetProduct, // 각 제품의 고유 ID
        orderCount: parseInt(orderCount.value), // 사용자가 입력한 수량
      };

      // 해당 제품이 있는지 없는지
      const existingProductIndex = existingCart.findIndex(
        (item) => item.product.productId === newProduct.product.productId
      );

      // 동일한 제품이 없으면 새로운 객체로 추가
      if (existingProductIndex == -1) {
        existingCart.push(newProduct);
        updateStorage(existingCart);
      }
      // 동일한 제품이 이미 장바구니에 있으면 수량을 업데이트
      else {
        const oc = existingCart[existingProductIndex].orderCount;
        const stck = existingCart[existingProductIndex].product.stock;
        const oc2 = newProduct.orderCount;
        if (oc <= stck)
          if (oc + oc2 > stck) {
            alert("재고 수량 초과");
          } else {
            existingCart[existingProductIndex].orderCount +=
              newProduct.orderCount;
            updateStorage(existingCart);
          }
      }
    }
  });

  // 구매 버튼
  getElement("order_button").addEventListener("click", () => {
    // 로컬 스토리지에 업데이트된 장바구니 저장
    const updateStorage = (existingCart) => {
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
      console.log("장바구니에 상품이 추가되었습니다.");
      alert("장바구니에 담겼습니다.");
      window.location.href = "/cart";
    };
    // 구매수량이 0일 때
    if (orderCount.value == 0) {
      alert("수량을 입력해주세요.");
      console.log("orderCount: ", orderCount.value);
      window.location.href = "/cart";
    } else {
      console.log("orderCount: ", orderCount.value);
      const existingCart =
        JSON.parse(window.localStorage.getItem("cart")) || [];

      const newProduct = {
        product: targetProduct, // 각 제품의 고유 ID
        orderCount: parseInt(orderCount.value), // 사용자가 입력한 수량
      };

      // 해당 제품이 있는지 없는지
      const existingProductIndex = existingCart.findIndex(
        (item) => item.product.productId === newProduct.product.productId
      );

      // 동일한 제품이 없으면 새로운 객체로 추가
      if (existingProductIndex == -1) {
        existingCart.push(newProduct);
        updateStorage(existingCart);
      }
      // 동일한 제품이 이미 장바구니에 있으면 수량을 업데이트
      else {
        const oc = existingCart[existingProductIndex].orderCount;
        const stck = existingCart[existingProductIndex].product.stock;
        const oc2 = newProduct.orderCount;
        if (oc <= stck)
          if (oc + oc2 > stck) {
            alert("재고 수량 초과");
          } else {
            existingCart[existingProductIndex].orderCount +=
              newProduct.orderCount;
            updateStorage(existingCart);
          }
      }
    }
  });
};

renderProductList();

function move(target) {
  const idValue = target.id;
  window.location.href = `/product/detail?id=${idValue}`;
}

homeButton.addEventListener("click", () => {
  window.location.href = "/";
});

productButton.addEventListener("click", () => {
  window.location.href = "/product";
});

cartButton.addEventListener("click", () => {
  window.location.href = "/cart";
});
