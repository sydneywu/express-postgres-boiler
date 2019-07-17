import Models from '../sequelize/models';

const Category = Models.Category;


let domainCategory = {
    findOneById: async (id) => {
        let category = await Category.findById(id);
        return category
    },

    findOne: async ({name}) => {
        let query = {
            where: {name: name}
        };
        let category = await Category.findOne(query);
        return category
    },

    findOneWithVendors: async ({name}) => {
        let query = {
            where: {name: name},
            include: [
                {
                    model: Models.Vendor,
                    as: 'vendors',
                    include: [
                        {model: Models.VendorInfo, as: 'vendorInfo'},
                        {model: Models.VendorContact, as: 'vendorContacts'},
                    ]
                },
            ]
        };
        let category = await Category.findOne(query);
        return category
    },

    findAll: async () => {
        let categories = await Category.findAll();
        return categories
    },

    findAllByVendor: async (vendorId) => {
        let query = {
            where: {vendorId: vendorId}
        };
        let categories = await Category.findAll(query);
        return categories
    },

    create: async ({name}) => {
        let category = await Category.create({name});
        return category
    },

    update: async (id, {name}) => {
        let category = await domainCategory.findOneById(id);
        await category.update({name});
        return category
    },

    delete: async (id) => {
        let category = await domainCategory.findOneById(id);
        if (category) {
            await category.destroy();
            return true
        } else {
            return false
        }

    }
};

export default domainCategory