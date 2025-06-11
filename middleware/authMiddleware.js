const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// routes에서 토큰을 검증할때 사용
const dotenv = require("dotenv");
dotenv.config();

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "인증 토큰이 없습니다." });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("토큰 에러", error);
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ message: "유효하지 않은 토큰입니다." });
  }
};

module.exports = {
  authenticateToken,
};
