let express = require('express');
let router = express.Router();
let users = require('./user');
let admin = require('./admin/index.js');
let site = require('./site/index.js');

/* GET home page. */

router.use('/api/admin/v1/', admin);
router.use('/api/site/v1/', site);

// catch 404 and forward to error handler
router.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

// Application Error
router.use(function (err, req, res, next) {
    res.status(err.statusCode || 500);
    res.json({
        message: err.message,   // todo:syd do not show err and message for production
        error: err
    });
});


module.exports = router;
