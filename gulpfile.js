
/**
 * File Name: gulpfile.js
 */

// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 语法检查
gulp.task('jshint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并文件, 之后压缩代码
gulp.task('minify', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist')) // distribution
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist')); // distribution
});

// 监视文件的变化
gulp.task('watch', function(){
    gulp.watch('./js/*.js', ['jshint', 'minify']);
});

// 默认任务
gulp.task('default', ['jshint', 'minify', 'watch']);
