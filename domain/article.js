import Models from '../sequelize/models';
import domainCategory from "./category";

const Article = Models.Article;

let domainArticle = {

    findOne: async ({id}) => {
        let query = {
            where: {id: id}
        };

        let article = await Article.findOneById(id);
        return article
    },

    findAll: async () => {
        let articles = await Article.findAll();
        return articles
    },

    create: async ({title, slug, shortContent, content, thumbnailImage, image}, options) => {
        let article = await Article.create({title, slug, shortContent, content, thumbnailImage, image, active: true}, options);
        return article
    },

    update: async (id, {name, slug, active}) => {
        let article = await domainArticle.findOne({id});
        await article.update({name, active});
        return article
    },

    addCategories: async({id, categoryNames})=>{
        if(!categoryNames) throw new Error('addCategory require categoryNames');
        if(!Array.isArray(categoryNames)) throw new Error('categoryNames should be array');
        let article = await domainArticle.findOne({id});
        if(!article) throw new Error('article not found');

        let matchedCategories = [];
        for(let i=0; i< categoryNames.length; i++){
            let category = await domainCategory.findOne({name: categoryNames[i]});
            if(!category) throw new Error('categoryName does not match any categories');
            matchedCategories.push(category)
        }
        await article.addCategories(matchedCategories);
        let query = {
            where: {id},
            include:[
                {model: Models.Category, as: 'categories'},
            ]
        };
        let updatedArticle = await Article.findOne(query)
        return updatedArticle
    },

    delete: async (id) => {
        let article = await domainArticle.findOne({id});
        if (article) {
            await article.destroy();
            return true
        } else {
            return false
        }

    }
};

export default domainArticle