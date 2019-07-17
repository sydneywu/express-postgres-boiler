'use strict';
module.exports = (sequelize, DataTypes) => {
    let Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        imgUrl: DataTypes.STRING,
    }, {});
    Category.associate = function (models) {

    };
    return Category;
};
