const loginButton = document.getElementById("login_button");
const joinButton = document.getElementById("join_button");

const signupButton = document.getElementById("signup_button");
const signupEmail = document.getElementById("signup_email");
const signupPassword = document.getElementById("signup_password");
const signupNickname = document.getElementById("signup_nickname");
const checkEmailButton = document.getElementById("check_email_button");

signupButton.addEventListener("click", async () => {
  const user = {
    email: signupEmail.value,
    password: signupPassword.value,
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
      window.location.href = "/";
    } else {
      alert("(!)회원가입 실패");
    }
  } catch (err) {
    console.error(err);
  }
});

checkEmailButton.addEventListener("click", async () => {
  const email = signupEmail.value;
  try {
    const emailCheckResponse = await fetch("/api/user/checking", {
      method: "post",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (emailCheckResponse.ok) {
      const emailCheck = await emailCheckResponse.json(); // JSON 응답 파싱
      if (emailCheck.result) {
        console.log("중복하는 이메일 없음");
        alert(emailCheck.message); // 서버에서 반환된 메시지 사용
      } else {
        console.log("중복하는 이메일 있음");
        alert(emailCheck.message); // 서버에서 반환된 메시지 사용
      }
    } else {
      console.error("서버 응답 오류");
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  } catch (err) {
    console.error(err);
  }
});

loginButton.addEventListener("click", () => {
  window.location.href = "/signin";
});

joinButton.addEventListener("click", () => {
  window.location.href = "/signup";
});
