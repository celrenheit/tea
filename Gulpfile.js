var gulp = require('gulp');
var mocha = require('gulp-mocha');


function onChange(event) {
  console.log('File', event.type +':', event.path);
}

function onChangeAPI(event) {
  onChange(event);
}

function onError(error) {
  console.error('\nError:', error.plugin);
  console.error(error.message);
}

gulp.task('test', function() {
  require('should');
  gulp.src('tests/**/*')
      .pipe(mocha({
        reporter: 'spec',
      }))
      .on('error', onError);
});

gulp.task('watch', function() {
  gulp.watch('api/**/*', ['test']).on('change', onChangeAPI);
  gulp.watch('tests/**/*', ['test']).on('change', onChange);
});

gulp.task('default', ['dev']);
gulp.task('dev', ['test', 'watch']);