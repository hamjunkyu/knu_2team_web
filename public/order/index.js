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
