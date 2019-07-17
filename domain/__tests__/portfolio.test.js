import {domainPortfolio} from '../index';
import {domainVendor} from '../index';

describe('DomainPortfolio __tests__', function() {
    let insertedVendor;
    let newPortfolio;
    let insertedPortfolio;

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

    it('add portfolio should add and return created portfolios', async () => {

        newPortfolio = {
            name: 'test name',
            description: 'test description',
            featureImgUrl: 'http://www.google.com',
            date: '2018-08-08',
            vendorId: insertedVendor.id
        };
        insertedPortfolio = await domainPortfolio.create(newPortfolio);
        expect(insertedPortfolio.firstName).toBe(newPortfolio.firstName);
    });

    it('add portfolio should throw error if featureImgUrl is not a valid url', async () => {
        let err;
        let testNewPortfolio = {
            name: 'test name',
            description: 'test description',
            featureImgUrl: 'testImageUrl',
            vendorId: insertedVendor.id
        };
        try{
            insertedPortfolio = await domainPortfolio.create(testNewPortfolio);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
    });

    it('add portfolio should throw error if vendorId not defined', async () => {
        let err;
        let testNewPortfolio = {
            name: 'test name',
            description: 'test description',
        };
        try{
            insertedPortfolio = await domainPortfolio.create(testNewPortfolio);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
    });

    it('fetch one portfolio should return correct portfolio', async () => {
        let portfolio = await domainPortfolio.findOne(insertedPortfolio.id);
        expect(portfolio.name).toBe(newPortfolio.name);
    });

    it('fetch one portfolio with data should return portfoliImage array', async () => {
        let portfolio = await domainPortfolio.findOneWithData({id:insertedPortfolio.id});
        expect(portfolio.name).toBe(newPortfolio.name);
        expect(portfolio.portfolioImage).toBeDefined();
    });

    it('update portfolio should update and return updated portfolio', async () => {
        let updates = {
            name: 'syd',
            vendorId: insertedVendor.id
        };
        let portfolio = await domainPortfolio.update(insertedPortfolio.id, updates);
        expect(portfolio.name).toBe(updates.name);
    });

    it('update portfolio with a different vendorId will throw error', async () => {
        let err;
        let updates = {
            name: 'portfolio-1000',
            vendorId: 10000
        };
        try{
            let portfolio = await domainPortfolio.update(insertedPortfolio.id, updates);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });

    it('fetch all portfolios should return at least one portfolio', async () => {
        let portfolios = await domainPortfolio.findAll();
        expect(portfolios.length).toBeGreaterThan(0);
    });

    it('should delete one portfolio', async () => {
        let deletedPortfolio = await domainPortfolio.delete(insertedPortfolio.id);
        expect(deletedPortfolio).toBe(true) //return true for success and false for failure
    })

});