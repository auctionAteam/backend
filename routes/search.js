const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

const { searchItem} = require('../controller/searchController');

router.route('/:name')
    .get(searchItem);

module.exports = router;
