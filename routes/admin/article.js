let express = require('express');
let router = express.Router();

import {headerAuthCheck} from "../../utilities/authManager";
import {domainArticle} from '../../domain/index';

router.param('id', async (req, res, next, idParams) => {
    req.id = idParams;
    return next();
});

router.get('/', headerAuthCheck, async function (req, res, next) {
    let articles = await domainArticle.findAll();
    res.json(articles)
});

router.get('/:id', headerAuthCheck, async function (req, res, next) {
    let article = await domainArticle.findOne({id: req.id});
    res.json(article)

});

router.post('/', headerAuthCheck,  async function (req, res, next) {
    try{
        let article = await domainArticle.create({...req.body});
        res.json(article)
    } catch(e){
        res.json({error: e})
    }

});

router.put('/:id', headerAuthCheck, async function (req, res, next) {
    let article = await domainArticle.update({...req.body, id: req.id});
    res.json(article)
});

router.put('/:id/addCategories', headerAuthCheck, async function (req, res, next) {
    let article = await domainArticle.addCategories({...req.body, id: req.id});
    res.json(article)
});

router.delete('/:id', headerAuthCheck, async function (req, res, next) {
    let status = await domainArticle.delete(req.id);
    res.json({status: status})
});


module.exports = router;