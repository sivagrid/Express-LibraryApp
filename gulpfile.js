var gulp = require('gulp');
var jshint = require('gulp-jshint');

var jsfiles = ['*.js', 'src/**/*.js'];
gulp.task('style', function(){
  return gulp.src(jsfiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }));
});

gulp.task('inject', function(){
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };

  var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
  var injectOptions = {
    ignorePath: '/public'
  };

  return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function(){
  var nodemon = require('gulp-nodemon');
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: jsfiles
  };
  return nodemon(options)
    .on('restart', function(){
      console.log('Restarting!..');
    });
});
