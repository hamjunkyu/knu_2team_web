window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  console.log("토큰", token);

  const loginButton = document.getElementById("login_button");
  const signupButton = document.getElementById("signup_button");

  const isTokenOk = async () => {
    try {
      if (!token) {
        // 토큰이 없을 경우 로그인 버튼을 설정하고 반환
        loginButton.textContent = "로그인";
        loginButton.addEventListener("click", () => {
          window.location.href = "/signin";
        });
        return;
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

        if (fetchData.isVerify) {
          // 토큰이 유효한 경우 로그아웃 버튼으로 설정
          loginButton.textContent = "로그아웃";
          loginButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "/"; // 로그아웃 후 홈으로 이동
            alert("로그아웃 되었습니다.");
          });
        } else {
          // 토큰이 유효하지 않은 경우 로그인 버튼으로 설정
          loginButton.textContent = "로그인";
          loginButton.addEventListener("click", () => {
            window.location.href = "/signin";
          });
        }
      } else {
        // fetch에 실패한 경우 로그인 버튼으로 설정
        loginButton.textContent = "로그인";
        loginButton.addEventListener("click", () => {
          window.location.href = "/signin";
        });
      }
    } catch (err) {
      console.log(err);
      alert("(!)에러");
      // 에러 발생 시 로그인 버튼으로 설정
      loginButton.textContent = "로그인";
      loginButton.addEventListener("click", () => {
        window.location.href = "/signin";
      });
    }
  };

  isTokenOk();

  signupButton.addEventListener("click", () => {
    window.location.href = "/signup";
  });

  document.getElementById("shop_now_button").addEventListener("click", () => {
    window.location.href = "/product";
  });
});
