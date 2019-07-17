import {domainAuth} from '../index';

describe('DomainAuth __tests__', function() {
    let newUser;

    beforeEach(function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        done();
    });

    afterEach(function(done) {
        done();
    });

    it('auth register should return jwt and user', async () => {
        newUser = {
            email: 'sydneyauthtest' + Math.floor(Math.random() * 10000) + '@gmail.com',
            password: '123456',
            vendorName: 'testVendor',
            vendorSlug: 'testVendor'
        };

        let registerResponse = await domainAuth.register(newUser);

        expect(registerResponse.token).toBeDefined();
    });

    it('auth login should return jwt and user', async () => {

        let loginResponse = await domainAuth.login(newUser);

        expect(loginResponse.token).toBeDefined();
    });

});