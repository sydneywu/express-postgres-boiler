let express = require('express');
let router = express.Router();
import {domainArticle} from '../../domain/index';

router.param('slug', async (req, res, next, slugParams) => {
    req.slug = slugParams;
    return next();
});

router.get('/', async function (req, res, next) {
    let articles = [{
        id: 1,
        title: "Best Wedding Advice",
        slug: 'best-wedding-advice',
        shortContent: "Don't spend too much",
        content: "Wedding is very expensive. Make sure do not overspend the budget. There are many other things to do such as honeymoon.",
        thumbnailImage: "http://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1540548073/iss_10288_02433_q5wg7q.jpg",
        image: "http://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1540548073/iss_10288_02433_q5wg7q.jpg",
    }, {

        id: 2,
        title: "Start Early",
        slug: 'start-early',
        shortContent: "Don't wait for the last minute to do anything",
        content: "Don't wait for the last minute to do anything",
        thumbnailImage: "https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1541402985/ISS_3054_02825_ext064.jpg",
        image: "https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1541402985/ISS_3054_02825_ext064.jpg",

    }];
    res.json(articles)
});

router.get('/:slug', async function (req, res, next) {
    let vendor = await domainVendorListing.findOneWithData({slug: req.slug});
    res.json(vendor)

});

module.exports = router;