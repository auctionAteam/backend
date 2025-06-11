const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  startAuction,
  bidAuction,
  closedAuction,
  getBidHistory,
} = require("../controller/auctionController");

router
  .route("/:itemId")
  .post(startAuction)
  .put(authenticateToken, bidAuction)
  .delete(closedAuction)
  .get(getBidHistory);

module.exports = router;
