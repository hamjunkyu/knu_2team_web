// 1)(프론트) 사용자가 [마이페이지] 버튼 혹은
//        직접 url을 입력해서 이동한다.
//     http://localhost:8000/mypage

// 2) , 3) user.controller.js
// 2)   (프론트+백)사용자가 페이지 접근 후,
//     localStorage에 있는 token을 꺼내서
//     백엔드로 보내서, 해당 토큰의 유효성을 검증한다.
//     jwt.verify(token, process.env.JWT_SECRET)

// 3) (백) 유효성 검증 결과에 따른 사용자 인증여부를
//     프론트로 반환한다.
//     res.json({isVerify: true})

// 4) (프론트)  3)로부터 받은 응답값을 통해서
//    토큰이 유효하다면 그대로 페이지 사용을 하게하고,
//    토큰이 유효X면 localhost:8000/signin 페이지

//토큰일치(마이페이지 이동)
window.location.href = "/public/mypage/index.html";
//토큰불일치(로그인페이지 이동)
window.location.href = "/public/signin/index.html";
