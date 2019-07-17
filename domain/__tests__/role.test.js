import {domainRole} from '../index';
import {domainUser} from '../index';
import {domainVendor} from '../index';
import Models from "../../sequelize/models";

describe('DomainRole __tests__', function() {
    let insertedVendor;
    let insertedUser;
    let newRole, insertedRole;
    let newRoleWithPermissions, insertedRoleWithPermissions;

    beforeAll(async (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        // create user which is required for foreign key
        let newUser = {
            email: 'sydneytest' + Math.floor(Math.random() * 10000) + '@gmail.com',
            username: 'sydneytest@gmail.com',
            password: 'Password1234'
        };
        insertedUser = await domainUser.create(newUser);

        // create vendor which is required for foreign key
        let newVendor = {name: 'vendor1'};
        insertedVendor = await domainVendor.create(newVendor);

        done()
    });

    afterAll(function(done) {
        done();
    });

    it('create role should create and return created role', async () => {
        newRole = {
            userId: insertedUser.id,
            vendorId: insertedVendor.id
        };
        insertedRole = await domainRole.create(newRole);
        expect(insertedRole.userId).toBe(insertedUser.id);
        expect(insertedRole.vendorId).toBe(insertedVendor.id);
        expect(insertedRole.active).toBe(true);
    });

    it('create role without userId should throw error', async () => {
        let err;
        let testNewRole = {
            userId: insertedUser.id,
        };
        try{
            await domainRole.create(testNewRole);
        } catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });

    it('create role without vendorId should throw error', async () => {
        let err;
        let testNewRole = {};
        try{
            await domainRole.create(testNewRole);
        } catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });


    it('fetch one role should return correct role', async () => {
        let role = await domainRole.findOne(insertedRole.id);
        expect(role.userId).toBeDefined();
        expect(role.vendorId).toBeDefined()
    });

    it('fetch one with UserId include vendor should return correct role with vendors', async () => {
        let role = await domainRole.findOneByUserIncludeVendorAndPermissions({userId: insertedUser.id});
        expect(role.vendor).toBeDefined();
        expect(role.vendorId).toBeDefined()
    });

    it('fetch one with UserId include vendor should return correct role with vendors', async () => {
        let role = await domainRole.findOneByUserIncludeVendorAndPermissions({userId: insertedUser.id});
        expect(role.vendor).toBeDefined();
        expect(role.vendorId).toBeDefined()
    });

    it('update role should update and return updated role', async () => {
        let updates = {
            active: false
        };
        let role = await domainRole.update(insertedRole.id, updates);
        expect(role.active).toBe(updates.active);
    });

    it('update role with wrong userId will throw error', async () => {
        let err;
        let updates = {
            userId: 10001
        };
        try {
            let role = await domainRole.update(insertedRole.id, updates);
        } catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });

    it('update role with wrong vendorId should throw error', async () => {
        let err;
        let updates = {
            vendorId: 10001
        };
        try {
            let role = await domainRole.update(insertedRole.id, updates);
        } catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });


    it('fetch all roles should return at least one role', async () => {
        let roles = await domainRole.findAll();
        expect(roles.length).toBeGreaterThan(0);
    });


    it('should delete one role', async () => {
        let delRole = await domainRole.delete(insertedRole.id);
        expect(delRole).toBe(true) //return true for success and false for failure
    });

});

describe('DomainRole withPermissions __tests__', function() {
        let insertedVendor;
        let insertedUser;
        let newRoleWithPermissions, insertedRoleWithPermissions;

        beforeAll(async (done) => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            // create user which is required for foreign key
            let newUser = {
                email: 'sydneytest' + Math.floor(Math.random() * 10000) + '@gmail.com',
                password: 'Password1234'
            };
            insertedUser = await domainUser.create(newUser);

            // create vendor which is required for foreign key
            let newVendor = {name: 'vendor1'};
            insertedVendor = await domainVendor.create(newVendor);

            done()
        });

        afterAll(function(done) {
            done();
        });
    it('createRole and addPermission should create and return created role', async () => {
        newRoleWithPermissions = {
            userId: insertedUser.id,
            vendorId: insertedVendor.id,
            permissionNames: ['all', 'product-read', 'product-edit']
        };
        let permissionNames = ['all', 'product-read', 'product-edit']
        let transaction = await Models.sequelize.transaction();
        insertedRoleWithPermissions = await domainRole.create(newRoleWithPermissions);
        let insertedRole = await domainRole.addPermissions({id: insertedRoleWithPermissions.id, permissionNames})
        expect(insertedRoleWithPermissions.userId).toBe(insertedUser.id);
        expect(insertedRoleWithPermissions.vendorId).toBe(insertedVendor.id);
        expect(insertedRoleWithPermissions.active).toBe(true);
    });

    it('fetch one with UserId include vendor and permission should return correct role with vendors and permissions', async () => {
        let role = await domainRole.findOneByUserIncludeVendorAndPermissions({userId: newRoleWithPermissions.userId});
        expect(role.vendor).toBeDefined();
        expect(role.vendorId).toBeDefined();
        expect(role.permissions.length).toBe(3);
        expect(role.permissions[0].name).toBe('all')
    });

});
