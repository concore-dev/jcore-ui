const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const path = require('path');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const fs = require('fs');


const assetsPath = path.join(__dirname, '..', '..', 'src', 'assets')


const configSvg = {
    shape: {
        spacing: {
            padding: 2
        }
    },
    mode: {
        view: {
            bust: true,
            render: {
                css: true
            }
        },
    }
};


const configSvgSymbol = {
    shape: {
        spacing: {
            padding: 2
        }
    },
    mode: {
        symbol: true // Activate the «symbol» mode
    }
};



gulp.task('icons', function () {
    return gulp.src(path.join(assetsPath, 'icons') + '/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest(path.join(assetsPath, 'sprite')));
});

gulp.task('sprite:arrow', async function () {
    gulp.src(path.join(assetsPath, 'icons', 'arrow') + '/*.svg')
        .pipe(svgSprite(configSvg))
        .pipe(gulp.dest(path.join(assetsPath, 'sprite', 'arrow')));

    gulp.src(path.join(assetsPath, 'icons', 'arrow') + '/*.svg')
        .pipe(cheerio({
            run: function ($) {
                // $('[fill]').removeAttr('fill');
                // $('[stroke]').removeAttr('stroke');
                // $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite(configSvgSymbol))
        .pipe(gulp.dest(path.join(assetsPath, 'sprite', 'arrow')));
});

const build = gulp.series([
    // 'sprite:menu',
    'sprite:arrow'
]);

gulp.task('sprite', build);