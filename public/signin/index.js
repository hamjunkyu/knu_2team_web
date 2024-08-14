const signinEmail = document.getElementById("signin_email");
const signinPassword = document.getElementById("signin_password");
const signinButton = document.getElementById("signin_button");
const signup_button = document.getElementById("signup_button");

signinButton.addEventListener("click", async () => {
  try {
    const email = signinEmail.value;
    const password = signinPassword.value;
    const signinResult = await fetch("/api/user/signin", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (signinResult.ok) {
      const rsigninResult = await signinResult.json();
      console.log("로그인 성공", rsigninResult);
      localStorage.setItem("token", rsigninResult.token);
    } else {
      alert("(!)로그인 오류");
    }
  } catch (err) {
    console.log(err);
    alert("(!) 로그인 오류");
  }
});

signupbutton.addEventListener("click", () => {
  window.location.href = "/signup/index.html"; // 서버의 설정에 맞게 경로를 수정
});
