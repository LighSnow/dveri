let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

let fs = require('fs');

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        icons: project_folder + "/icomoon/",
        favicon: project_folder + "/favicon/",
        svg: project_folder + "/svg/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico, webp}",
        fonts: source_folder + "/fonts/**/*.{ttf,eot,svg,woff}",
        icons: source_folder + "/icomoon/**/*.*",
        favicon: source_folder + "/favicon/**/*.*",
        svg: source_folder + "/svg/**/*.*",
        allJs: source_folder + "/**/**/*.js",
        allCss: source_folder + "/**/**/*.scss"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/**/**/*.scss",
        js: source_folder + "/**/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let {
        src,
        dest
    } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require("gulp-webpcss"),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    concat = require('gulp-concat');

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude({
            context: {
                nameToolsDoor: ['Ручки', 'Замки', 'Петли', 'Накладки', 'Фиксаторы', 'Цилиндры', 'Раздвижные системы'],
                nameToolsGlass: ['Ручки', 'Замки', 'Петли', 'Цилиндры', 'Ограничители', 'Комплекты', 'Раздвижные системы'],
                nameToolsDuoDoor: ['Звонки', 'Доводчики', 'Видеоглазки', 'Ограничители', 'Цилиндры', 'Замки с цилиндром', 'Замки сувальдные'],
                colorAndTitleCheckboxCategory: [
                    ['#ffffff', 'Белый'],['#ff0000', 'Красный'],['#ffff00', 'Желтый'],
                    ['#004e8d', 'Синий'],['#000000', 'Черный'],['#625f5f', 'Серый'],
                    ['#240b2b', 'Дуб французский капучино'],['#af8655', 'Капучино вералинга'],
                    ['#ccc0b0', 'Дуб филадельфия грей'],['#3d322d', 'Малага черри кроскут'],['#fff59b', 'Дуб горвард кремовый']
                ]
            }
        }))
        // .pipe(webp html())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function icons() {
    return src(path.src.icons)
        .pipe(dest(path.build.icons));
}

function svg() {
    return src(path.src.svg)
        .pipe(dest(path.build.svg));
}

function favicon() {
    return src(path.src.favicon)
        .pipe(dest(path.build.favicon));
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function libsCss() {
    return src('#src/scss/libs.scss')
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}


function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function libsJs() {
    return src('#src/js/libs.js')
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
};

gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
})

gulp.task('svgSprite', function () {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg", //sprite file name
                    example: true
                }
            },
        }))
        .pipe(dest(path.build.img));
})

function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.img], libsJs);
    gulp.watch([path.watch.css], libsCss);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, svg, fonts, icons, favicon, libsJs, libsCss));
let watch = gulp.parallel(build, watchFiles, browserSync);


// exports.style = style;
// exports.script = script;
exports.fontsStyle = fontsStyle;
exports.svg = svg;
exports.favicon = favicon;
exports.icons = icons;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
// exports.tepmplates = tepmplates;
exports.build = build;
exports.watch = watch;
exports.default = watch;