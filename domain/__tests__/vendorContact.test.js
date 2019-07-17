import {domainVendorContact} from '../index';
import {domainVendor} from '../index';

describe('DomainVendorContact __tests__', function() {
    let insertedVendor;
    let newVendorContact;
    let insertedVendorContact;

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

    it('add vendorContact should add and return created vendorContact', async () => {

        newVendorContact = {
            vendorId: insertedVendor.id,
            mainContact: true,
            phone: '80000000',
            address: '123 test Rd',
            postalCode: '500000',
            openingHours: {"monday": "10am-10pm"}
        };
        insertedVendorContact = await domainVendorContact.create(newVendorContact);
        expect(insertedVendorContact.firstName).toBe(newVendorContact.firstName);
    });

    it('add vendorContact should throw error if vendorId not defined', async () => {
        let err;
        let testNewVendorContact = {
            mainContact: true,
            phone: '80000000',
        };
        try{
            insertedVendorContact = await domainVendorContact.create(testNewVendorContact);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
    });

    it('fetch one vendorContact should return correct vendorContact', async () => {
        let vendorContact = await domainVendorContact.findOne({id: insertedVendorContact.id});
        expect(vendorContact.phone).toBe(newVendorContact.phone);
    });

    it('update vendorContact should update and return updated vendorContact', async () => {
        let updates = {
            vendorId: insertedVendor.id,
            phone: '80000002',
        };
        let vendorContact = await domainVendorContact.update(insertedVendorContact.id, updates);
        expect(vendorContact.phone).toBe(updates.phone);
    });

    it('update vendorContact with a different vendorId will throw error', async () => {
        let err;
        let updates = {
            phone: '6000000',
            vendorId: 10000
        };

        try{
            let vendorContact = await domainVendorContact.update(insertedVendorContact.id, updates);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });

    it('fetch all vendorContactsByVendor should return at least one vendorContact', async () => {
        let vendorContacts = await domainVendorContact.findAllByVendor({vendorId: insertedVendor.id});
        expect(vendorContacts.length).toBeGreaterThan(0);
    });

    it('should delete one vendorContact', async () => {
        let deletedVendorContact = await domainVendorContact.delete(insertedVendorContact.id);
        expect(deletedVendorContact).toBe(true) //return true for success and false for failure
    });

});