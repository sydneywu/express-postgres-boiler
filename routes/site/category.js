let express = require('express');
let router = express.Router();
import {domainCategory} from '../../domain/index';

router.param('name', async (req, res, next, nameParams) => {
    req.categoryName = nameParams;
    return next();
});

router.get('/:name', async function (req, res, next) {
    let category = await domainCategory.findOneWithVendors({name: req.categoryName});
    res.json(category)
});

router.get('/', async function (req, res, next) {
    let categories = await domainCategory.findAll();
    res.json(categories)
});


module.exports = router;