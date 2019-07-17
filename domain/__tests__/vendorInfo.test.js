import {domainVendorInfo} from '../index';
import {domainVendor} from '../index';

describe('DomainVendorInfo __tests__', function() {
    let insertedVendor;
    let newVendorInfo;
    let insertedVendorInfo;

    beforeAll(async (done) => {

        // create vendor which is required for foreign key
        let newVendor = {name: 'vendor1'};
        insertedVendor = await domainVendor.create(newVendor);

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done();
    });

    afterAll(function(done) {
        done();
    });

    it('add vendorInfo should add and return created vendorInfo', async () => {

        newVendorInfo = {
            vendorId: insertedVendor.id,
            email: 'vendor1@gmail.com',
            description: 'We are very passionate people',
            websiteUrl: 'www.google.com',
            vendorImgUrl: 'http://www.google.com',
            establishmentDate: '2010-01-01',
            companyName: 'Vendor 1 Pte Ltd',
            businessRegistratioNo: '12345678L'
        };
        insertedVendorInfo = await domainVendorInfo.create(newVendorInfo);
        expect(insertedVendorInfo.email).toBe(newVendorInfo.email);
    });

    it('add vendorInfo should throw error if vendorId not defined', async () => {
        let err;
        let testNewVendorInfo = {
            email: 'vendor1@gmail.com',
        };
        try{
            insertedVendorInfo = await domainVendorInfo.create(testNewVendorInfo);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
    });

    it('fetch one vendorInfo should return correct vendorInfo', async () => {
        let vendorInfo = await domainVendorInfo.findOne({id: insertedVendorInfo.id});
        expect(vendorInfo.email).toBe(newVendorInfo.email);
    });

    it('update vendorInfo should update and return updated vendorInfo', async () => {
        let updates = {
            vendorId: insertedVendor.id,
            phone: '80000002',
        };
        let vendorInfo = await domainVendorInfo.update(insertedVendorInfo.id, updates);
        expect(vendorInfo.email).toBe(updates.email);
    });

    it('update vendorInfo with a different vendorId will throw error', async () => {
        let err;
        let updates = {
            email: '6000000',
            vendorId: 10000
        };

        try{
            let vendorInfo = await domainVendorInfo.update(insertedVendorInfo.id, updates);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });


    it('should delete one vendorInfo', async () => {
        let deletedVendorInfo = await domainVendorInfo.delete(insertedVendorInfo.id);
        expect(deletedVendorInfo).toBe(true) //return true for success and false for failure
    });

});