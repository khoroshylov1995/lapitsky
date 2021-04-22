let PROJECT_FOLDER = "build"
let SOURCE_FOLDER = "src"

let path = {
    build: {
        html: PROJECT_FOLDER + "/",
        css: PROJECT_FOLDER + "/css/",
        js: PROJECT_FOLDER + "/js/",
        img: PROJECT_FOLDER + "/img/",
        fonts: PROJECT_FOLDER + "/fonts/",
    },
    src: {
        html: [SOURCE_FOLDER + "/*.html", "!" + SOURCE_FOLDER + "/_*.html"],
        css: SOURCE_FOLDER + "/sass/style.sass",
        js: SOURCE_FOLDER + "/js/script.js",
        img: SOURCE_FOLDER + "/img/**/*",
        fonts: SOURCE_FOLDER + "/fonts/*",
    },
    watch: {
        html: SOURCE_FOLDER + "/**/*.html",
        css: SOURCE_FOLDER + "/sass/**/*.sass",
        js: SOURCE_FOLDER + "/js/**/*.js",
        img: SOURCE_FOLDER + "/img/",
    },
    clean: "./" + PROJECT_FOLDER + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webp-css')

function browserSync() {
    browsersync.init({
        server: { baseDir: "./" + PROJECT_FOLDER + "/" },
        port: 1337,
        notify: false,
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 4,
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(sass({
            outputStyle: "expanded",
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 2 versions"],
            cascade: true
        }))
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

function clean() {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(js, css, images, fonts, html))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.fonts = fonts
exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch