const getElement = (id) => document.getElementById(id);

const basketButton = getElement("basket_button");
const logOutButton = getElement("logout");
const homeButton = getElement("home_button");

const introduce = document.getElementById("introduce");

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
        //토큰일치
        // window.location.href = "http://localhost:8000/mypage";
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
