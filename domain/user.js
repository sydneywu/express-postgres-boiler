import Models from '../sequelize/models';

const User = Models.User;
import {hashPassword} from "../utilities/passwordManager.js"

let domainUser = {

    findOne: async ({email, id}) => {
        let query;
        if (email) {
            query = {
                where: {
                    email: email
                }
            };
        }
        if (id) {
            query = {
                where: {
                    id: id
                }
            };
        }
        let users = await User.findAll(query);
        let user = users[0];
        return user
    },

    findOneById: async (id) => {
        let query = {
            where: {id: id}
        };
        let users = await User.findAll(query);
        let user = users[0];
        return user
    },

    findOneByIdWithProfile: async (id) => {
        let query = {
            where: {id: id},
            include: [
                {model: Models.Profile, as: 'profile'}
            ]
        };
        let users = await User.findAll(query);
        let user = users[0];
        return user
    },

    findAll: async () => {
        let users = await User.findAll();
        return users
    },

    create: async ({email, password}, options) => {
        let hashedPassword = await hashPassword(password);
        let user = await User.create({email: email, password: hashedPassword}, options);
        return user
    },

    update: async (id, {email, password}) => {
        let user = await domainUser.findOneById(id);
        await user.update({email, password});
        return user
    },

    delete: async (id) => {
        let user = await domainUser.findOneById(id);
        if (user) {
            await user.destroy();
            return true
        } else {
            return false
        }

    }
};

export default domainUser