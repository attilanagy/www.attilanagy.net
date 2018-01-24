'use strict';

var browserSynch = require("browser-sync").create(),
    ciEnv = process.env.CI ? true : false,
    cleanCSS = require("gulp-clean-css"),
    cssValidator = require("gulp-w3c-css"),
    del = require("del"),
    gulp = require("gulp"),
    htmlmin = require("gulp-htmlmin"),
    htmlminConfig = { collapseWhitespace: true, removeComments: true },
    htmlvalidator = require("gulp-w3cjs"),
    icons = require("simple-icons"),
    inject = require("gulp-inject-string"),
    noop = require("through2").obj,
    nunjucks = require("gulp-nunjucks"),
    postcss = require("gulp-postcss"),
    sass = require("gulp-sass"),
    uncssPlugin = require("postcss-uncss")({ html: [ "build/*.html" ]});

gulp.task("clean", () => {
  return del([ "build/" ]);
});

gulp.task("html", () => {
  return gulp.src("src/templates/*.html")
         .pipe(nunjucks.compile({ icons: icons }, { autoescape: false }))
         .pipe(ciEnv ? htmlmin(htmlminConfig) : noop())
         .pipe(gulp.dest("build/"));
});

gulp.task("htmlvalidator", () => {
  return gulp.src("build/*.html")
         .pipe(htmlvalidator())
         .pipe(htmlvalidator.reporter());
});

gulp.task("sass", [ "html" ], () => {
  return gulp.src("src/sass/attilanagy.scss")
         .pipe(sass().on("error", sass.logError))
         .pipe(ciEnv ? postcss([ uncssPlugin]) : noop())
         .pipe(ciEnv ? cleanCSS() : noop())
         .pipe(gulp.dest("build/css"));
});

gulp.task("cssValidator", () => {
  return gulp.src("build/css/*.css")
         .pipe(cssValidator());
});

gulp.task("dist", [ "sass" ]);

gulp.task("serve", [ "sass" ], () => {
  browserSynch.init( { "server": "./build/" });
  gulp.watch("./src/sass/*.scss", [ "sass" ]);
  gulp.watch("./src/templates/**/*.html", [ "html" ]);
});
