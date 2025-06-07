const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {startAuction, bidAuction, closedAuction} = require('../controller/auctionController');


router.route("/:itemId")
    .post(startAuction)
    .put(bidAuction)
    .delete(closedAuction);

module.exports = router;
