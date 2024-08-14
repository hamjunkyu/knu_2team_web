const fetchProductList = async () => {
  const fetchResult = await fetch("/api/product/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (fetchResult.ok) {
    const fetchData = await fetchResult.json();
    console.log(fetchData);
    return fetchData.data;
  } else {
    return null;
  }
};

const productlistWrapper = document.getElementById("product_list_wrapper");

const renderProductList = async () => {
  const productList = await fetchProductList();

  if (!productList || productList.length === 0) {
    console.log("empty productlist");
    return;
  }
  productList.forEach((v) => {
    const itemElem = document.createElement("div");
    itemElem.innerHTML = `<div>${v.title}</div>
        <div>가격: ${v.price}원</div>
        <div>[상세설명] ${v.description}</div>
        <div><img src="${v.imgUrl}"/></div>
        <div>[재고수량] ${v.stock}"(개)</div>`;
    productlistWrapper.append(itemElem);
  });
};
renderProductList();
