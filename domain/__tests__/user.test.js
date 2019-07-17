import {domainUser} from '../index';

describe('DomainUser __tests__', function () {
    let newUser;
    let insertedUser;

    beforeEach(function (done) {
        //domainProfile = new DomainProfile();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done()
    });

    afterEach(function (done) {
        done();
    });

    it('add user should add and return created user', async () => {
        newUser = {
            email: 'sydneytest' + Math.floor(Math.random() * 10000) + '@gmail.com',
            username: 'sydneytest@gmail.com',
            password: '123456'
        };
        insertedUser = await domainUser.create(newUser);
        expect(insertedUser.email).toBe(newUser.email);
    });


    it('findOneById should return correct user', async () => {
        let user = await domainUser.findOneById(insertedUser.id);
        expect(user.email).toBe(newUser.email);
    });

    it('findOneById by email should return correct user', async () => {
        let user = await domainUser.findOne({email: insertedUser.email});
        expect(user.email).toBe(newUser.email);
    });

    it('update user should update and return updated user', async () => {
        let updates = {
            email: 'hello-kitty@gmail.com'
        };
        let user = await domainUser.update(insertedUser.id, updates);
        expect(user.email).toBe(updates.email);
    });

    it('fetch all users should return at least one user', async () => {
        let users = await domainUser.findAll();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should delete one user', async () => {
        let delUserStatus = await domainUser.delete(insertedUser.id);
        expect(delUserStatus).toBe(true) //return 1 for success and 0 for failure
    })
});
