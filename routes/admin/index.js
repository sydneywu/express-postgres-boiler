let express = require('express');
let router = express.Router();
let auth = require('./auth');
let vendor = require('./article');
let article = require('./article');

router.use('/auth', auth);
router.use('/vendor', vendor);
router.use('/article', article);

module.exports = router;
