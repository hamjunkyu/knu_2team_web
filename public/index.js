window.addEventListener("load", () => {
  console.log("로그인 페이지 로딩 완료.");
});

const loginButton = document.getElementById("login_button");
const signupButton = document.getElementById("signup_button");

loginButton.addEventListener("click", async () => {
  window.location.href = "/signin";
});

signupButton.addEventListener("click", async () => {
  window.location.href = "/signup";
});

document
  .getElementById("shop_now_button")
  .addEventListener("click", function () {
    window.location.href = "/product";
  });
