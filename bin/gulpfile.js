var gulp = require("gulp"),
    watch = require("gulp-watch"),
    prefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    rigger = require("gulp-rigger"),
    cssmin = require("gulp-minify-css"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    rimraf = require("rimraf"),
    source = require("vinyl-source-stream"),
    browserify = require("browserify"),
    browserSync = require("browser-sync").create();


var path = {
    build: {
        js: "../frontend/build/js/",
        style: "../frontend/build/css/",
        img: "../frontend/build/img/",
        fonts: "../frontend/build/fonts/"
    },
    src: {
        js:  "../frontend/assets/js/app.js",
        style: "../frontend/assets/css/index.scss",
        img: "../frontend/assets/image/**/*.*",
        fonts: "../frontend/assets/fonts/**/*.*"
    },
    watch: {
        js: "../frontend/assets/js/**/*.js",
        style: "../frontend/assets/css/**/*.*ss",
        img: "../frontend/assets/image/**/*.*"
    },
    clean: "..fonts/build"
};

gulp.task("clean", function (cb) {
    rimraf(path.clean, cb);
});

gulp.task("fonts:build", function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task("image:build", function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("style:build", function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ["src/css/"],
            outputStyle: "compressed",
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(browserSync.reload({stream: true}));
});




gulp.task("js:build",["browserify"]);

gulp.task("browserify", function() {
    return browserify(path.src.js)
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task("build", [
    "js:build",
    "style:build",
    "fonts:build",
    "image:build"
]);


gulp.task("watch", function() {
    watch([path.watch.style], function(event, cb) {
        setTimeout(function(){
            gulp.start("style:build");
        },500);
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start("js:build");
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start("image:build");
    });

});


gulp.task("browserSync", ["build", "watch"], function() {
    browserSync.init({
        proxy: "localhost:5002",
        serveStatic: ["../public"]
    });
});

/* jshint ignore:end */