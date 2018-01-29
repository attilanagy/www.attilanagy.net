'use strict';

var browserSynch = require("browser-sync").create(),
    ciEnv = process.env.CI ? true : false,
    config = require("./site-config.json"),
    cleanCSS = require("gulp-clean-css"),
    cssValidator = require("gulp-w3c-css"),
    del = require("del"),
    gulp = require("gulp"),
    htmlmin = require("gulp-htmlmin"),
    htmlminConfig = { collapseWhitespace: true, removeComments: true },
    htmlvalidator = require("gulp-w3cjs"),
    ico = require('gulp-to-ico'),
    icons = require("simple-icons"),
    noop = require("through2").obj,
    nunjucks = require("gulp-nunjucks"),
    postcss = require("gulp-postcss"),
    sass = require("gulp-sass"),
    svg2png = require("gulp-svg2png"),
    uncssPlugin = require("postcss-uncss")({ html: [ "build/*.html" ]}),
    variables = { icons: icons, links: config.links };

gulp.task("clean", () => {
  return del([ "build/" ]);
});

gulp.task("favicon", () => {
  return gulp.src("src/favicon/favicon.svg")
         .pipe(svg2png())
         .pipe(ico("favicon.ico"))
         .pipe(gulp.dest("build/"));
});

gulp.task("html", () => {
  return gulp.src("src/templates/*.html")
         .pipe(nunjucks.compile(variables, { autoescape: false }))
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

gulp.task("dist", [ "sass", "favicon" ]);

gulp.task("serve", [ "sass", "favicon" ], () => {
  browserSynch.init( { "server": "build/" });
  gulp.watch("src/favicon/favicon.svg", [ "favicon" ])
  gulp.watch("src/sass/*.scss", [ "sass" ]);
  gulp.watch("src/templates/**/*.html", [ "html" ]);
});
