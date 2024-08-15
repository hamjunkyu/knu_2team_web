const productCartWrapper = document.getElementById("product_cart_wrapper");

const productsInCart = localStorage.getItem("cart");
let priceSum = 0;

productsInCart.forEach((product) => {
  const itemElem = document.createElement("div");
  itemElem.classList.add("product-item");
  itemElem.innerHTML = `
      <img src="${product.imgUrl}" alt="${product.title}">
      <h3 onclick=move(${product.productId})>${product.title}</h3>
      <p class="price">${product.price}원</p>
      <p class="stock">재고: ${product.stock}개</p>
    `;

  productCartWrapper.append(itemElem);
});

const move = (id) => {
  window.location.href = `http://localhost:8000/product/detail?id=${id}`;
};
