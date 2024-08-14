window.addEventListener("load", () => {
  console.log("로그인 페이지 로딩 완료.");
});

const loginButton = document.getElementById("login_button");
const signupButton = document.getElementById("signup_button");

loginButton.addEventListener("click", async () => {
  window.location.href = "http://localhost:8000/signin";
});

signupButton.addEventListener("click", async () => {
  window.location.href = "http://localhost:8000/signup";
});
