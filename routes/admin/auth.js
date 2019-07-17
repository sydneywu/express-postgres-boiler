let express = require('express');
let router = express.Router();
import {headerAuthCheck} from "../../utilities/authManager";

import {domainAuth} from '../../domain/index';
import {domainRole} from '../../domain/index';

router.post('/register', async (req, res, next) => {
    try{
        let registerResponse = await domainAuth.register({
            email: req.body.email,
            password: req.body.password,
        });
        res.json(registerResponse);
    } catch(err){
        next(err)
    }

});

router.post('/login', async (req, res, next) => {
    try{
        let loginResponse = await domainAuth.login({
            email: req.body.email,
            password: req.body.password,
        });
        res.json(loginResponse);
    } catch(err){
        next(err)
    }
});

router.get('/roles', headerAuthCheck, async (req, res, next) => {
    console.log('req.userId', req.userId);
    try{
        let role = await domainRole.findOneByUserIncludeVendorAndPermissions({
            userId: req.userId
        });
        let roles = [role];
        res.json(roles);
    } catch(err){
        next(err)
    }
});

module.exports = router;