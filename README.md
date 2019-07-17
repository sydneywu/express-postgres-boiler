## Pre-requisite
Require Gulp.

Require Postgresql install.

Create two databases, one for development and one for test

## Installation
### Normal Installation
After cloning or pulling from repo. Run the following command to populate sample data in the development

npm install
gulp sample-data

This app also require a secret.js and sequelize-config.json in config/
Check the sample file for format

### Docker Installation (advanced)
docker build -t express-postgres-boiler .

####To run docker container
requirements: need to create secret.js and sequelize-config.json and link them like so
docker run -p4000:4000 -d --name exp-postgres -v /home/penguin/docker-config/express-postgres-boiler/secret.js:/usr/src/app/config/secret.js -v /home/penguin/docker-config/express-postgres-boiler/sequelize-config.json:/usr/src/app/config/sequelize-config.json express-postgres-boiler

####To access docker container
docker exec -it some-name /bin/bash

## Usage
###Swagger
assuming port is 4000. The swagger file is at
swagger for client is located at http://localhost:4000/api-docs/
