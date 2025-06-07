const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

const { allItem, addItem, detailItem, likeItem} = require('../controller/itemController');

router.route('/')
    .get(allItem)
    .post(authenticateToken,addItem);

router.route('/:itemId')
    .get(detailItem)
    .post(authenticateToken, likeItem);


    // 이미지 아직 안됨

module.exports = router;
