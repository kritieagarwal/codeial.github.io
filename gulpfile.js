// require = require('esm')(module);
const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');


gulp.task('css', async () => {
    console.log('Minifying CSS');

    // ** means any folder/subfolder; * means any file; pipe calls all middlewares
    await import('gulp-rev').then((rev) => {
        gulp.src('./assets/sass/**/*.scss')
            .pipe(sass())             //sass to css
            .pipe(cssnano())          //compressing css
            .pipe(gulp.dest('./assets/css'));

        console.log('Minified CSS');

        gulp.src('./assets/**/*.css')
            .pipe(rev.default())        //reversioning or renaming
            .pipe(gulp.dest('./public/assets'))
            .pipe(rev.default.manifest({
                cwd: 'public',
                merge: true
            }))
            .pipe(gulp.dest('./public/assets'));
    });
});



gulp.task('js', async () => {
    console.log('Minifying JS');

    await import('gulp-rev').then((rev) => {
        gulp.src('./assets/**/*.js')
            .pipe(uglify())
            .pipe(rev.default())
            .pipe(gulp.dest('./public/assets'))
            .pipe(rev.default.manifest({
                cwd: 'public',
                merge: true
            }))
            .pipe(gulp.dest('./public/assets'));
    });
});


gulp.task('images', async () => {
    console.log('Compressing images..');

    await import('gulp-rev').then((rev) => {
        gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
            .pipe(imagemin())
            .pipe(rev.default())
            .pipe(gulp.dest('./public/assets'))
            .pipe(rev.default.manifest({
                cwd: 'public',
                merge: true
            }))
            .pipe(gulp.dest('./public/assets'));
    });
});


// empty the public/assets directory
gulp.task('clean:assets', function (done) {
    del.sync(['./public/assets'], { force: true });
    done();
});



gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function (done) {
    console.log('Building assets');
    done();
});
