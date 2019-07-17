import {domainPortfolioImage} from '../index';
import {domainPortfolio} from '../index';
import {domainVendor} from '../index';

describe('DomainPortfolio __tests__', function() {
    let insertedVendor;
    let insertedPortfolio;
    let newPortfolioImage;
    let insertedPortfolioImage;

    beforeAll(async (done) => {

        // create vendor which is required for foreign key
        let newVendor = {name: 'vendor1'};
        insertedVendor = await domainVendor.create(newVendor);

        // create vendor which is required for foreign key
        let newPortfolio = {name: 'test name', vendorId: insertedVendor.id, featureImgUrl: 'http://www.google.com'};
        insertedPortfolio = await domainPortfolio.create(newPortfolio);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done();
    });

    afterAll(function(done) {
        done();
    });

    it('add portfolioImage should add and return created portfolioImage', async () => {

        newPortfolioImage = {
            name: 'test name',
            description: 'test description',
            url: 'http://www.google.com',
            date: '2018-08-08',
            vendorId: insertedVendor.id,
            portfolioId: insertedPortfolio.id
        };
        insertedPortfolioImage = await domainPortfolioImage.create(newPortfolioImage);
        expect(insertedPortfolio.name).toBe(newPortfolioImage.name);
    });

    it('add portfolioImage should throw error if url is not a valid url', async () => {
        let err;
        let testNewPortfolio = {
            name: 'test name',
            description: 'test description',
            url: 'testImageUrl',
            vendorId: insertedVendor.id,
            portfolioId: insertedPortfolio.id
        };
        try{
            insertedPortfolioImage = await domainPortfolioImage.create(testNewPortfolio);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
    });

    it('add portfolioImage should throw error if vendorId not defined', async () => {
        let err;
        let testNewPortfolioImage = {
            name: 'test name',
            description: 'test description',
            portfolioId: insertedPortfolio.id
        };
        try{
            insertedPortfolioImage = await domainPortfolioImage.create(testNewPortfolioImage);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
    });

    it('fetch one portfolioImage should return correct portfolioImage', async () => {
        let portfolioImage = await domainPortfolioImage.findOne(insertedPortfolioImage.id);
        expect(portfolioImage.name).toBe(newPortfolioImage.name);
    });

    it('update portfolio should update and return updated portfolio', async () => {
        let updates = {
            name: 'syd',
            vendorId: insertedVendor.id,
            portfolioId: insertedPortfolio.id
        };
        let portfolioImage = await domainPortfolioImage.update(insertedPortfolioImage.id, updates);
        expect(portfolioImage.name).toBe(updates.name);
    });

    it('update portfolioImage with a different vendorId will throw error', async () => {
        let err;
        let updates = {
            name: 'portfolio-1000',
            vendorId: 10000
        };
        try{
            let portfolioImage = await domainPortfolioImage.update(insertedPortfolioImage.id, updates);
        }catch(error){
            err = error
        }
        expect(err).toBeDefined();
    });

    it('fetch all portfolios should return at least one portfolio', async () => {
        let portfolioImages = await domainPortfolioImage.findAll();
        expect(portfolioImages.length).toBeGreaterThan(0);
    });

    it('should delete one portfolio', async () => {
        let deletedPortfolioImage = await domainPortfolioImage.delete(insertedPortfolioImage.id);
        expect(deletedPortfolioImage).toBe(true) //return true for success and false for failure
    })

});