const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

const { allItem, addItem, detailItem, likeItem, searchItem} = require('../controller/itemController');

router.route('/')
    .get(allItem)
    .post(addItem);

router.route('/:itemId')
    .get(detailItem)
    .post(authenticateToken, likeItem);

router.route('/search/:name')
    .get(searchItem);

    // 이미지 아직 안됨

module.exports = router;
