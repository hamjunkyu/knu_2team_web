window.addEventListener("DOMContentLoaded", async () => {
  const isTokenOk = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
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

/*
1) 김수현
(프론트) 사용자가 [마이페이지] 버튼 혹은
직접 url을 입력해서 이동한다
http://localhost:8000/mypage

2) 함준규
(프론트+백) 사용자가 페이지 접근 후,
localStorage에 있는 token을 꺼내서
백엔드로 보내서, 해당 토큰의 유효성을 검증한다 

3) 김한수
(백) 유효성 검증 결과에 따른 사용자 인증여부를
프론트로 반환한다
res.json({ isVerify: true })

4) 유지희
(프론트) 3)으로부터 받은 응답값을 통해서
토큰이 유효하다면 그대로 페이지 사용을 하게하고,
토큰이 유효하지 않다면 localhost:8000/signin 페이지로 

*/
