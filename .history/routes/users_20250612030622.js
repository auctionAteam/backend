const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  join,
  login,
  infomation,
  userItem,
} = require("../controller/userController");

router.post("/join", join);
router.post("/login", login);
router.get("/info", authenticateToken, infomation);
router.post("/item", authenticateToken, userItem);

module.exports = router;
