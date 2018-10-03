'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    html2pdf = require('gulp-html2pdf'),
    markdownPdf = require('gulp-markdown-pdf');
 
gulp.task('html', function () {
    return gulp
        .src('./*.html')
        .pipe(html2pdf())
        .pipe(gulp.dest('./'));
});
 
gulp.task('md', function(){
    return gulp
        .src('./*.md')
        .pipe(markdownPdf())
        .pipe(gulp.dest('./rename\ the\ file\ to\ be\ \.pdf'))
});
    
gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function(){
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        '/img/*.{png,jpg,gif}'
    ];
    browserSync.init(files, {
        server : {
            baseDir: './'
        }
    });
});

gulp.task('default', ['browser-sync'], function(){
    gulp.start('sass:watch');
});