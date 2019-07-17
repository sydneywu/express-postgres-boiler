'use strict';

let now = new Date()
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Category', [
            {name: 'photographer', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846702/cat-photo_u9xtei.jpg'},
            {name: 'videographer', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846678/cat-film_pitojc.jpg'},
            {name: 'bridal', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846696/cat-gown_n31ugs.jpg'},
            {name: 'emcee', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846683/cat-mike_damfbo.jpg'},
            {name: 'restaurant', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846705/cat-wine_souxeg.jpg'},

            {name: 'photobooth', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846702/cat-photo_u9xtei.jpg'},
            {name: 'florist', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846678/cat-film_pitojc.jpg'},
            {name: 'band', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846696/cat-gown_n31ugs.jpg'},
            {name: 'hotel', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846683/cat-mike_damfbo.jpg'},
            {name: 'outdoor', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846705/cat-wine_souxeg.jpg'},
            {name: 'banquet', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846678/cat-film_pitojc.jpg'},
            {name: 'jeweller', createdAt: now, updatedAt: now,imgUrl:'https://res.cloudinary.com/www-weddingpenguin-co/image/upload/v1538846702/cat-photo_u9xtei.jpg'},
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Category', null, {});
    }
};