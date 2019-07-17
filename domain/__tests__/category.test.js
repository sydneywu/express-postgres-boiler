import {domainCategory} from '../index';

describe('DomainCategory __tests__', function() {
    let newCategory, insertedCategory;

    beforeAll(async (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done();
    });

    afterAll(function(done) {
        done();
    });

    it('add category should add and return created categories', async () => {

        newCategory = {
            name: 'photographer',
        };
        insertedCategory = await domainCategory.create(newCategory);
        expect(insertedCategory.name).toBe(newCategory.name);
    });

    it('fetch one by id category should return correct category', async () => {
        let category = await domainCategory.findOneById(insertedCategory.id);
        expect(category.name).toBe(newCategory.name);
    });

    it('fetch one category should return correct category', async () => {
        let category = await domainCategory.findOne({name: newCategory.name});
        expect(category.name).toBe(newCategory.name);
    });

    it('fetch one category should return correct category', async () => {
        let category = await domainCategory.findOne({name: insertedCategory.name});
        expect(category.name).toBe(newCategory.name);
    });

    it('update category should update and return updated category', async () => {
        let updates = {
            name: 'videographer',
        };
        let category = await domainCategory.update(insertedCategory.id, updates);
        expect(category.name).toBe(updates.name);
    });

    it('fetch all categories should return at least one category', async () => {
        let categories = await domainCategory.findAll();
        expect(categories.length).toBeGreaterThan(0);
    });

    it('should delete one category', async () => {
        let deletedCategory = await domainCategory.delete(insertedCategory.id);
        expect(deletedCategory).toBe(true) //return true for success and false for failure
    })

});