const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../service/user.service");
const userController = require("express").Router();

const jwt = require("jsonwebtoken");

userController.post("/signin", async (req, res) => {
  const body = req.body;
  // 사용자로부터 email과 password를 받음.
  const email = req.body.email;
  const password = req.body.password;
  //email 혹은 password 둘 중 하나라도 없으면 나가
  if (!email || !password) {
    return res
      .status(400)
      .json({ result: false, message: "(!)로그인 정보가 올바르지 않습니다." });
  }
  //email을 기준으로 DB에서 유저 데이터를 꺼내와야 함.
  const user = await getUserByEmail(email);
  if (!user) {
    return res
      .status(404)
      .json({ result: false, message: "(!)회원 정보가 없습니다." });
  }
  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (isValidPassword) {
    const token = jwt.sign(
      { email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ result: true, message: "로그인 성공", token });
  } else {
    return res.status(400).json({ result: false, message: "(!)비밀번호 틀림" });
  }
});
userController.post("/", async (req, res) => {
  const { email, password, nickname } = req.body;
  console.log(req.body);

  // 1) email 검증
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 email 입니다." });
  }
  // 2) password 검증
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 비밀번호 형식입니다." });
  }
  // 3) nickname 검증
  if (nickname.length < 2) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 nickname 형식입니다." });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = {
    email, // email: email
    nickname, // nickname: nickname
    password: hashedPassword,
  };
  try {
    await createUser(user);
    return res.status(201).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false });
  }
});

module.exports = userController;
