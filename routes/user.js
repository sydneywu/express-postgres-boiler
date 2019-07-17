let express = require('express');
let router = express.Router();

import {headerAuthCheck} from '../utilities/authManager'
import {domainUser} from '../domain/index';

router.param('id', async (req, res, next, idParams) => {
    req.id = idParams;
    return next();
});

router.get('/', headerAuthCheck, async function (req, res, next) {
    let users = await domainUser.findAll();
    res.set('Content-Range', 'users ' + 0 + '-' + 6 + '/' + 24);
    res.set('X-Total-Count', users.length);
    res.json(users)
});

router.get('/:id', async function (req, res, next) {
    let user = await domainUser.findOneById(req.id);
    res.json(user)

});

router.post('/', async function (req, res, next) {
    let user = await domainUser.create({email: req.body.email, password: req.body.password});
    res.json(user)
});

router.put('/:id', async function (req, res, next) {
    let user = await domainUser.update(req.id, {email: req.body.email, password: req.body.password});
    res.json(user)
});

router.delete('/:id', async function (req, res, next) {
    let status = await domainUser.delete(req.id);
    res.json({status: status})
});


module.exports = router;
