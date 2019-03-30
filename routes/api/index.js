const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/bookmarks', require('./bookmarks'));

module.exports = router;