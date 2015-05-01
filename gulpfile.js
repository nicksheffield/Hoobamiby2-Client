var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');        // concat js
var concatCss = require('gulp-concat-css'); // concat css
var uglify = require('gulp-uglify');        // uglify js
var uglifycss = require('gulp-uglifycss');  // uglify css
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var bowerFiles = require('bower-files')();
var es = require('event-stream');

// set up the task for working on my styles
gulp.task('styles', function () {

	// this is to gracefully fail stylus
	var s = stylus(), sFail = function(){s.end();}

	return es.merge(
		gulp.src([
			'bower_components/animate.css/animate.css'
		]),
		gulp.src('assets/css/style.styl').pipe(s).on('error', sFail)
	)
		.pipe(concatCss('style.css'))
		.pipe(uglifycss())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('assets/dist'));
});

// set up the task for working on my app scripts
gulp.task('app', function(){
	return gulp.src([
		'app/app.js',
		'app/app.auth.js',
		'app/app.route.js',
		'app/controllers/*.js',
		'app/directives/*.js',
		'app/filters/*.js',
		'app/services/*.js'
	])
		.pipe(concat('app.min.js'))
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest('assets/dist'));
});

// set up the task for working on my bower dependency scripts
gulp.task('libs', function(){
	return gulp.src(bowerFiles.ext('js').files)
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/dist'));
});

// watch those tasks
gulp.task('default', ['styles', 'app'], function(){
	gulp.watch([
		'assets/css/*.styl',
		'assets/css/**/*.styl'
	], ['styles']);

	gulp.watch([
		'app/*.js',
		'app/**/*.js'
	], ['app']);
});