let express = require('express');
let router = express.Router();
let article = require('./article');
let category = require('./category');

router.use('/article', article);
router.use('/category', category);

module.exports = router;
