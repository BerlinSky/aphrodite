import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import exorcist from 'exorcist';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
// var fontAwesome = require('node-font-awesome');
import fontAwesome from 'node-font-awesome';

import util from 'gulp-util';

const config = {
	paths: {
		html: './src/*.html',
		js: './src/scripts/**/*.js?',
		sass: './src/sass/**/*.scss',
		css: './dist/styles/',
		dist: './dist',
		mainJs: './src/scripts/main.js'
	}
}

watchify.args.debug = true;

const sync = browserSync.create({port: 10010, browser: "google chrome"});

// Input file.
watchify.args.debug = true;
var bundler = browserify('src/scripts/main.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    .on('error', function(error){
      console.error( '\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(exorcist('dist/scripts/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest('dist/scripts'));
}

gulp.task('transpile', ['lint'], () => bundle());

gulp.task('lint', () => {
	log('lint task started');

  return gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('html', () => {
	log('html task starts');

	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist));

	log('html task ends');
});

gulp.task('sass', () => {
	log('sass task starts');

  gulp.src([config.paths.sass])
	  .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [fontAwesome.scssPath]
	    }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest(config.paths.css));

	log('sass task ends');
});

gulp.task('serve', ['html', 'sass', 'transpile'], () => sync.init({ server: 'dist', browser: "google chrome" }))
gulp.task('js-watch', ['transpile'], () => sync.reload());
gulp.task('html-watch', ['html'], () => sync.reload());
gulp.task('sass-watch', ['sass'], () => sync.reload());

gulp.task('watch', ['serve'], () => {
  gulp.watch('src/*.html', ['html-watch'])
  gulp.watch(config.paths.sass, ['sass-watch'])
  gulp.watch('src/scripts/**/*', ['js-watch'])
})

gulp.task('default', ['watch']);

///////////
function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				util.log(util.colors.blue(msg[item]));
			}
		}
	}
	else {
		util.log(util.colors.blue(msg));
	}
}
