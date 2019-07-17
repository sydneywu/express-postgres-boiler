import {domainVendor} from '../index';

describe('DomainVendor __tests__', function () {
    let newVendor;
    let insertedVendor;

    beforeEach(function (done) {
        //domainProfile = new DomainProfile();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done()
    });

    afterEach(function (done) {
        done();
    });

    it('add vendor should add and return created vendor', async () => {
        newVendor = {
            name: 'testVendor2',
            slug: 'test-vendor2',
        };
        insertedVendor = await domainVendor.create(newVendor);
        expect(insertedVendor.name).toBe(newVendor.name);
    });


    it('findOne should return correct vendor', async () => {
        let vendor = await domainVendor.findOne({id: insertedVendor.id});
        expect(vendor.name).toBe(newVendor.name);
    });

    it('update vendor should update and return updated vendor', async () => {
        let updates = {
            name: 'hello-kitty@gmail.com',
            active: false,
        };
        let vendor = await domainVendor.update(insertedVendor.id, updates);
        expect(vendor.name).toBe(updates.name);
    });

    it('fetch all vendors should return at least one vendor', async () => {
        let vendors = await domainVendor.findAll();
        expect(vendors.length).toBeGreaterThan(0);
    });

    it('addCategories should return vendor with permissions', async () => {
        let vendor = await domainVendor.addCategories({categoryNames:['photographer', 'videographer'], id:insertedVendor.id});
        expect(vendor.categories.length).toBeGreaterThan(0);
    });

    /*  //todo:syd set to soft delete
    it('should delete one vendor', async () => {
        let delVendorStatus = await domainArticle.delete(insertedVendor.id);
        expect(delVendorStatus).toBe(true) //return 1 for success and 0 for failure
    })
    */
});
