'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const gutil = require('gulp-util')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const nodemon = require('gulp-nodemon')
const sourcemaps = require('gulp-sourcemaps')
const livereload = require('gulp-livereload')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const watchify = require('watchify')
const babelify = require('babelify')

gulp.task('browserify', function() {
  const bundler = browserify('game/game.js').transform(babelify, {presets: ['es2015']})

  rebundle()

  function rebundle() {
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('game/game.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(sourcemaps.write('../dist'))
      .pipe(gulp.dest('dist'))
      .pipe(livereload({start: true}))
  }
})

gulp.task('watchify', function() {
  watchify.args.debug = false
  const bundler = watchify(browserify('game/game.js', watchify.args))

  bundler.transform(babelify, {presets: ['es2015']})

  bundler.on('update', rebundle)
  bundler.on('log', gutil.log.bind(gutil))

  function rebundle() {
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('game/game.js'))
      .pipe(buffer())
      .pipe(rename('app.min.js'))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('../dist'))
      .pipe(gulp.dest('dist'))
      .pipe(livereload({start: true}))
  }

  return rebundle()
})

gulp.task('sass', function() {
  return gulp
    .src('game/styles.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload({start: true}))
})

gulp.task('sass:watch', function() {
  gulp.watch('game/**/*.scss', ['sass'])
})

gulp.task('html', function() {
  return gulp
    .src('game/index.html')
    .pipe(livereload({start: true}))
})

gulp.task('html:watch', function() {
  gulp.watch('game/index.html', ['html'])
})

gulp.task('nodemon', function() {
  nodemon({
    script: './server/server.js',
    env: {
      'NODE_ENV': 'development'
    },
    ignore: ['client', 'dist']
  })
})

gulp
  .task('default', ['nodemon', 'sass:watch', 'html:watch', 'watchify'])
  .task('build', ['browserify', 'sass'])
