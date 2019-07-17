let request = require('supertest');
let app = require("../../app.js");
let apiPath = '/api/admin/v1';
import sampleDataContent from "./sample-data-content.js"

let main = async () => {
    for (let i=0; i<sampleDataContent.length; i++){
        let {body: {token: jwtToken}} = await request(app)
            .post(apiPath + '/auth/register')
            .send(sampleDataContent[i].user)
            .expect('Content-Type', /json/)
            .expect(200);

        let vendorRolesResponse = await request(app)
            .get(apiPath + '/auth/roles')
            .set("Authorization", jwtToken)
            .send(sampleDataContent[i].user)
            .expect('Content-Type', /json/)
            .expect(200);

        let vendorId = vendorRolesResponse.body[0].vendor.id;

        let {body: {id: vendorInfoId}} = await request(app)
            .post(apiPath + '/vendorInfo')
            .send(sampleDataContent[i].vendorInfo)
            .set("Authorization", jwtToken)
            .set("x-vendor-id", vendorId)  //refactor id to get from vendor
            .expect('Content-Type', /json/)
            .expect(200);

        await request(app)
            .post(apiPath + '/category/')
            .send(sampleDataContent[i].category)
            .set("Authorization", jwtToken)
            .set("x-vendor-id", vendorId)
            .expect('Content-Type', /json/)
            .expect(200);

        for(let j=0; j < sampleDataContent[i].portfolios.length; j++){
            let {body: {id: portfolioId}} = await request(app)
                .post(apiPath + '/portfolio')
                .send(sampleDataContent[i].portfolios[j])
                .set("Authorization", jwtToken)
                .set("x-vendor-id", vendorId)
                .expect('Content-Type', /json/)
                .expect(200);

            for(let k=0; k < sampleDataContent[i].portfolios[j].portfolioImages.length; k++){
                let {body: {id: portfolioImageId}} = await request(app)
                    .post(apiPath + '/portfolioImage')
                    .send({...sampleDataContent[i].portfolios[j].portfolioImages[k], portfolioId})
                    .set("Authorization", jwtToken)
                    .set("x-vendor-id", vendorId)
                    .expect('Content-Type', /json/)
                    .expect(200);
            }
        }
    }
};



main().then(() => {
    console.log("all sample data generated");
    process.exit()
}).catch((err) => {
    console.log(err);
    process.exit()
});


