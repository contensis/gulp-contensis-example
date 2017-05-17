'use strict';
// -----------------------------------------------------------------------------
// Required Plugins
// -----------------------------------------------------------------------------
var gulp = require('gulp');
var gulpContensisSync = require('gulp-contensis-sync');



var contensisSync = gulpContensisSync.create({
  "user": "username",
  "password": "password",
  "cmsUrl": "http://instancename.cloud.contensis.com",
  "project": "projectname"
});



// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------
var config = {
  src: './site-elements/**/*.*',
  dest: 'site-elements'
};



// -----------------------------------------------------------------------------
// test-push
// A task to test what files would be pushed to Contensis
// -----------------------------------------------------------------------------
gulp.task('test-push', function() {

  var options = {
    prefix: config.dest,
    simulate: true
  };

  return gulp.src(config.src)
    .pipe(contensisSync.transfer(options))
    .pipe(gulpContensisSync.reporter());

});



// -----------------------------------------------------------------------------
// push
// A task to push files to Contensis
// Uncomment the .pipe(contensisSync.cache()) to speed up consecutive uploads
// it uses an MD5 hash of the file to determine if any changes have been made
// -----------------------------------------------------------------------------
gulp.task('push', function() {

  var options = {
    prefix: config.dest,
    simulate: false
  };

  return gulp.src(config.src)
    //.pipe(contensisSync.cache())
    .pipe(contensisSync.transfer(options))
    .pipe(gulpContensisSync.reporter());

});



// -----------------------------------------------------------------------------
// push-prod
// A task to push files to Contensis and submit the content for approval.
//
// Uncomment the approve property to auto approve content on push
// -----------------------------------------------------------------------------
gulp.task('push-prod', function() {

  var options = {
    prefix: config.dest,
    simulate: false,
    force: true,
    submit: true,
    //approve: true
  };

  return gulp.src(config.src)
    .pipe(contensisSync.transfer(options))
    .pipe(gulpContensisSync.reporter());

});



// -----------------------------------------------------------------------------
// test-sync
// A task to test what files would be synced between the
// local environment and Contensis including deletions
// -----------------------------------------------------------------------------
gulp.task('test-sync', function() {

  var options = {
    prefix: config.dest,
    simulate: true
  };

  return gulp.src(config.src)
    .pipe(contensisSync.transfer(options))
    .pipe(contensisSync.sync(options, [/^site-elements\/db/]))
    .pipe(gulpContensisSync.reporter());

});



// -----------------------------------------------------------------------------
// sync
// A task to sync files between a local environment
// and Contensis including deletions
// -----------------------------------------------------------------------------
gulp.task('sync', function() {

  var options = {
    prefix: config.dest,
    simulate: false
  };

  return gulp.src(config.src)
    .pipe(contensisSync.transfer(options))
    .pipe(contensisSync.sync(options))
    .pipe(gulpContensisSync.reporter());

});
