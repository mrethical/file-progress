const gulp = require('gulp');
const { series, watch } = require('gulp');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const ts = require('gulp-typescript');



gulp.task('clean', () => {
  return del(['dist/*'])
});

const build = () => {
  return browserify({
    basedir: '.',
    entries: ['src/global.ts'],
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('file-progress.js'))
    .pipe(gulp.dest('dist'));
};
const buildES6 = () => {
  const tsProject = ts.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist/es6'));
};
const watcher = () => {
  watch('./src/*', build);
};

gulp.task('watch', series(build, watcher));
gulp.task('build', build);
gulp.task('build-all', series(build, buildES6));

exports.default = build;
