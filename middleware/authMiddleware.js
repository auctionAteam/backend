const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// routes에서 토큰을 검증할때 사용


const authenticateToken = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "인증 토큰이 없습니다." });
    }

    try {
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        // user의 값을 다음 라우터에서도 쓸수있게 decoded 하였다.
        req.user = decoded;
        
        next();
    } catch (error) {
        console.log("토큰 에러", error)
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "유효하지 않은 토큰입니다." });
    }
};



module.exports = {
    authenticateToken
};