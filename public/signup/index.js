const signupEmail = document.getElementById("signup_email");
const singupPassword = document.getElementById("signup_password");
const signupNickname = document.getElementById("signup_nickname");

signupButton.addEventListener("click", async () => {
  const user = {
    email: signupEmail.value,
    password: singupPassword.value,
    nickname: signupNickname.value,
  };
  console.log(user);
  try {
    const signupResult = await fetch("/api/user/", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (signupResult.ok) {
      alert("회원가입 성공");
    } else {
      alert("(!)회원가입 실패");
    }
  } catch (err) {
    console.error(err);
  }
});
