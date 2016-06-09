/* eslint-disable */
'use strict';

const path         = require('path');
const gulp         = require('gulp');
const runSequence  = require('run-sequence');
const $            = require('gulp-load-plugins')();

const paths = {
    src : {
        js : path.join(__dirname, 'public/app')
    },
    dist : {
        js   : path.join(__dirname, '/dist/')
    }
};

function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('browserify', function() {
	gulp.src(paths.src.js + '/app.js')
		.pipe($.browserify({
            insertGlobals: true,
            debug: true
		}))
        .on('error', onError)
        .pipe($.rename('save-hollande.js'))
		.pipe(gulp.dest(paths.dist.js))
        .pipe($.uglify())
        .pipe($.rename('save-hollande.min.js'))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('watch', function watch() {
    gulp.watch(paths.src.js + '/**/*.js', ['browserify']);
    gulp.watch(paths.src.js + '/*.js', ['browserify']);
});
