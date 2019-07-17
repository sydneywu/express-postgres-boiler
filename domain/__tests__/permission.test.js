import {domainPermission} from '../index';

describe('DomainPermission __tests__', function() {
    let newPermission, insertedPermission;

    beforeAll(async (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done();
    });

    afterAll(function(done) {
        done();
    });

    it('add permission should add and return created permissions', async () => {

        newPermission = {
            name: 'testPermission1',
        };
        insertedPermission = await domainPermission.create(newPermission);
        expect(insertedPermission.name).toBe(newPermission.name);
    });

    it('fetch one permission should return correct permission', async () => {
        let permission = await domainPermission.findOne(insertedPermission.id);
        expect(permission.name).toBe(newPermission.name);
    });

    it('update permission should update and return updated permission', async () => {
        let updates = {
            name: 'testPermission2',
        };
        let permission = await domainPermission.update(insertedPermission.id, updates);
        expect(permission.name).toBe(updates.name);
    });

    it('fetch all permissions should return at least one permission', async () => {
        let permissions = await domainPermission.findAll();
        expect(permissions.length).toBeGreaterThan(0);
    });

    it('should delete one permission', async () => {
        let deletedPermission = await domainPermission.delete(insertedPermission.id);
        expect(deletedPermission).toBe(true) //return true for success and false for failure
    })

});