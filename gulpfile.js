'use strict';

var browserSynch = require("browser-sync").create(),
    cleanCSS = require("gulp-clean-css"),
    del = require("del"),
    gulp = require("gulp"),
    sass = require("gulp-sass");

var cssGenerator = gulp.src("src/sass/attilanagy.scss")
                   .pipe(sass().on("error", sass.logError)),
    cssDestination = gulp.dest("build/css");

gulp.task("clean", () => {
  return del([ "build/" ]);
});


gulp.task("html", () => {
  return gulp.src("src/index.html")
         .pipe(gulp.dest("build/"));
});

gulp.task("sass", () => {
  return cssGenerator
         .pipe(cssDestination);
});

gulp.task("dist", [ "html" ], () => {
  return cssGenerator
         .pipe(cleanCSS())
         .pipe(cssDestination);
});

gulp.task("serve", [ "sass", "html" ], () => {
  browserSynch.init( { "server": "./build/" });
  gulp.watch("./src/sass/*.scss", [ "sass" ]);
  gulp.watch("./src/*.html", [ "html" ]);
});
