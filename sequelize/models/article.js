'use strict';
module.exports = (sequelize, DataTypes) => {
    let Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        content: DataTypes.BOOLEAN,
        shortContent: DataTypes.STRING,
        thumbnailImage: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {});
    Article.associate = function (models) {
        Article.belongsToMany(models.Category, {through: 'ArticleCategory', foreignKey: 'articleId', as: 'categories'});
    };
    return Article;
};
