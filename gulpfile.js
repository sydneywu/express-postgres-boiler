/* File: gulpfile.js */

// grab our gulp packages
const gulp  = require('gulp');
const gutil = require('gulp-util');
const exec = require('child_process').exec;
const argv = require('yargs').argv;
const runSequence = require('run-sequence');

const ENVIRONMENT = (argv.env || argv.e || 'development').toLowerCase();

gulp.task('migrate', function (cb) {
    exec(`sequelize db:migrate --env ${ENVIRONMENT}`, function (err, stdout, stderr) {
        console.log(ENVIRONMENT);
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task('migrate-undo', function (cb) {
    exec(`sequelize db:migrate:undo:all --env ${ENVIRONMENT}`, function (err, stdout, stderr) {
        console.log(ENVIRONMENT);
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task('seed', function (cb) {
    exec(`sequelize db:seed:all --env ${ENVIRONMENT}`, function (err, stdout, stderr) {
        console.log(ENVIRONMENT);
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('_build-sample-data', function (cb) {
    exec(`npm run sample-data`, function (err, stdout, stderr) {
        console.log(ENVIRONMENT);
        console.log(stdout);
        console.log(stderr




        );
        cb(err);
    });
});

gulp.task('sample-data', function (cb){
    runSequence('migrate-undo', 'migrate', 'seed', '_build-sample-data', cb);
});

//can also pass in argument e.g.( remigrate-and-seed --env test)
gulp.task('remigrate-and-seed', function (cb){
    runSequence('migrate-undo', 'migrate', 'seed', cb);
});

// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});
