import {domainProfile} from '../index';
import {domainUser} from '../index';

describe('DomainProfile __tests__', function() {
    let insertedUser, insertedUserProfile

    beforeEach(function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done();
    });

    afterEach(function(done) {
        done();
    });

    it('fetch profiles should also include userId', async () => {
        let newUser = {
            email: 'sydneytest' + Math.floor(Math.random() * 10000) + '@gmail.com',
            username: 'sydneytest@gmail.com',
            password: '123456'
        };
        insertedUser = await domainUser.create(newUser);
        let newUserProfile = {
            firstName: 'sydney',
            lastName: 'test',
            gender: 'male',
            phone: '12345678',
            userId: insertedUser.id
        };
        insertedUserProfile = await domainProfile.create(newUserProfile);

        expect(insertedUserProfile.userId).toBe(insertedUser.id);
    });

    it('fetch userWithProfile should also include userId', async () => {
        let userWithProfile = await domainUser.findOneByIdWithProfile(insertedUser.id);

        expect(userWithProfile.profile.id).toBe(insertedUserProfile.id)
    })

});