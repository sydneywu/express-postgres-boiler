import Models from '../sequelize/models';
let User = Models.User;
import domainArticle from "./article.js"
import domainUser from "./user.js"
import {hashPassword, comparePassword} from "../utilities/passwordManager.js"
import {jwtSign} from "../utilities/authManager.js"
import {ERR_CONST, errHandler} from "../utilities/errorHelper"

let domainAuth = {

    login: async ({email, password}) => {
        let users = await User.scope('withPassword').findAll({where: {email}});
        if (!users) return {error: true};
        if (users < 1) return {error:true};

        let user = users[0];
        if(!user) errHandler(ERR_CONST.INVALID_USERNAME_OR_PASSWORD);

        let passwordValid = await comparePassword({password: password, hashedPassword: user.password})
        if (!passwordValid) errHandler(ERR_CONST.INVALID_USERNAME_OR_PASSWORD);

        let token = jwtSign({userId: user.id});

        delete user.password;
        return {token: 'Bearer '+ token}
    },

    register: async ({email, password}) => {
        let transaction;
        let user , role;
        try{
            transaction = await Models.sequelize.transaction();
            user = await domainUser.create({email: email, password: password}, {transaction});
            await transaction.commit();
        }catch(err){
            console.log(err);
            await transaction.rollback();
            errHandler(ERR_CONST.UNABLE_TO_CREATE_USER);
        }
        let token = jwtSign({userId: user.id});
        return {token:'Bearer '+ token};
    },
};

export default domainAuth