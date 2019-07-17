import jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from '../config/secret.js'

export const jwtSign = (payload)=>{
    let jwtToken = jwt.sign(
        payload,
        JWT_SECRET_KEY,
        {expiresIn: 60*60*24*60}    //2 months
    );
    return jwtToken
};

export const jwtDecode = (jwtToken)=>{
    let payload = jwt.verify(jwtToken, JWT_SECRET_KEY);
    return payload
};

export const headerAuthCheck = (req, res, next) => {
    let auth = req.get("authorization");
    if (!auth){
        res.status(401);
        res.json({error: "Unauthorized User Request"});
        return;
    }

    let authInfoArray = auth.split(' ');

    if (authInfoArray[0] !== "Bearer") {
        res.status(401);
        res.json({error: "Unauthorized User Request"})
    } else {
        let token = authInfoArray[1];
        let payload = jwtDecode(token);
        req.userId = payload.userId;
        next();
    }
};