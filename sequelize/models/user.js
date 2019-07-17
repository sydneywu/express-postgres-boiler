'use strict';
let UserModel = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        emailVerified: DataTypes.BOOLEAN,
        googleAuthId: DataTypes.STRING,
        fbAuthId: DataTypes.STRING,
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword:{
                attributes: { include: ['password'] },

            }
        }
    });
    User.associate = function (models) {
    };
    return User;
};

export default UserModel
