const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

const { allItem, addItem, detailItem, likeItem} = require('../controller/itemController');

router.route('/')
    .get(allItem)
    .post(addItem);

router.route('/:itemId')
    .get(detailItem)
    .post(authenticateToken, likeItem);

    // item의 state 컬럼을 만들지 말고 이중쿼리문이나 join을 써서 state를 보여주게 하기
    // 이미지 아직 안됨

module.exports = router;
