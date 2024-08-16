const homeButton = document.getElementById("home_button");
const joinButton = document.getElementById("join_button");

const signinEmail = document.getElementById("signin_email");
const signinPassword = document.getElementById("signin_password");
const signinButton = document.getElementById("signin_button");

const tosignupButton = document.getElementById("tosignup_button");
const mypageButton = document.getElementById("mypage_button");

signinButton.addEventListener("click", async () => {
  const email = signinEmail.value;
  const password = signinPassword.value;
  try {
    const signinResult = await fetch("/api/user/signin", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (signinResult.ok) {
      const result = await signinResult.json();
      console.log("로그인 성공", result);
      localStorage.setItem("token", result.token);
      window.location.href = "/";
    } else {
      alert("(!)로그인 오류");
    }
  } catch (err) {
    console.error(err);
    alert("(!) 로그인 오류");
  }
});
homeButton.addEventListener("click", async () => {
  window.location.href = "/";
});

joinButton.addEventListener("click", () => {
  window.location.href = "/signup";
});
