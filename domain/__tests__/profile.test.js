import {domainProfile} from '../index';
import {domainUser} from '../index';

describe('DomainProfile __tests__', function() {
    let insertedUser;
    let newProfile;
    let insertedProfile;

    beforeAll(async (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        // create user which is required for profile foreign key
        let newUser = {
            email: 'sydneytest' + Math.floor(Math.random() * 10000) + '@gmail.com',
            username: 'sydneytest@gmail.com',
            password: '123456'
        };
        insertedUser = await domainUser.create(newUser);
        done();
    });

    afterAll(function(done) {
        done();
    });

    it('add profile should add and return created profiles', async () => {

        newProfile = {
            firstName: 'sydney',
            lastName: 'test',
            gender: 'male',
            mobile: '12345678',
            userId: insertedUser.id
        };
        insertedProfile = await domainProfile.create(newProfile);
        expect(insertedProfile.firstName).toBe(newProfile.firstName);
    });

    it('add profile should throw error if userId not defined', async () => {
        let err
        let testNewProfile = {
            firstName: 'sydney',
            lastName: 'test',
            gender: 'male',
            mobile: '12345678',
        };
        try{
            insertedProfile = await domainProfile.create(testNewProfile);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
    });

    it('fetch one profile should return correct profile', async () => {
        let profile = await domainProfile.findOne(insertedProfile.id);
        expect(profile.firstName).toBe(newProfile.firstName);
    });

    it('update profile should update and return updated profile', async () => {
        let updates = {
            firstName: 'syd',
            userId: insertedUser.id
        };
        let profile = await domainProfile.update(insertedProfile.id, updates);
        expect(profile.first_name).toBe(updates.first_name);
    });

    it('update profile with a different userId will throw error', async () => {
        let err
        let updates = {
            firstName: 'syd',
            userId: 10000
        };
        try{
            let profile = await domainProfile.update(insertedProfile.id, updates);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });

    it('fetch all profiles should return at least one profile', async () => {
        let profiles = await domainProfile.findAll();
        expect(profiles.length).toBeGreaterThan(0);
    });

    it('should delete one profile', async () => {
        let deletedProfile = await domainProfile.delete(insertedProfile.id);
        expect(deletedProfile).toBe(true) //return true for success and false for failure
    })

});