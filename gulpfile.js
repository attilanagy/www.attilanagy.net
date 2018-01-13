'use strict';

var browserSynch = require("browser-sync").create(),
    cleanCSS = require("gulp-clean-css"),
    del = require("del"),
    gulp = require("gulp"),
    icons = require("simple-icons"),
    inject = require("gulp-inject-string"),
    noop = require("through2").obj(),
    sass = require("gulp-sass");

gulp.task("clean", () => {
  return del([ "build/" ]);
});

gulp.task("html", () => {
  return gulp.src("src/index.html")
         .pipe(inject.replace("<!-- linkedin-icon -->", icons["LinkedIn"]["svg"]))
         .pipe(inject.replace("<!-- twitter-icon -->", icons["Twitter"]["svg"]))
         .pipe(inject.replace("<!-- github-icon -->", icons["GitHub"]["svg"]))
         .pipe(inject.replace("<!-- rss-icon -->", icons["RSS"]["svg"]))
         .pipe(gulp.dest("build/"));
});

gulp.task("sass", () => {
  return gulp.src("src/sass/attilanagy.scss")
         .pipe(sass().on("error", sass.logError))
         .pipe(process.env.CI ? cleanCSS() : noop)
         .pipe(gulp.dest("build/css"));
});

gulp.task("dist", [ "html", "sass" ]);

gulp.task("serve", [ "sass", "html" ], () => {
  browserSynch.init( { "server": "./build/" });
  gulp.watch("./src/sass/*.scss", [ "sass" ]);
  gulp.watch("./src/*.html", [ "html" ]);
});
