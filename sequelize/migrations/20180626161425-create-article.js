'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Article', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            slug: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            shortContent: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            content: {
                type: Sequelize.STRING(65536),
                required: true,
                unique: true
            },
            thumbnailImage: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            image: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            active: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Vendor');
    }
};