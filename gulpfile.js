'use strict';

var browserSynch = require("browser-sync").create(),
    ciEnv = process.env.CI ? true : false,
    config = require("./site-config.json"),
    cleanCSSPlugin = require("postcss-clean"),
    cssValidator = require("gulp-w3c-css"),
    cucumber = require("gulp-cucumber"),
    del = require("del"),
    gulp = require("gulp"),
    htmlmin = require("gulp-htmlmin"),
    htmlvalidator = require("gulp-w3cjs"),
    ico = require('gulp-to-ico'),
    icons = require("simple-icons"),
    mergeStrem = require("merge-stream"),
    noop = require("through2").obj,
    nunjucks = require("gulp-nunjucks"),
    postcss = require("gulp-postcss"),
    sass = require("gulp-sass"),
    svg2png = require("gulp-svg2png"),
    uncssPlugin = require("postcss-uncss")({ html: [ "build/*.html" ]}),
    variables = { icons: icons, links: config.links, ciEnv: ciEnv },
    variables4Background = { backgroundColor: config.backgroundColor };

gulp.task("clean", () => {
  return del([ "build/" ]);
});

gulp.task("favicon", () => {
  var svgSource = gulp.src("src/favicon/favicon.svg")
         .pipe(nunjucks.compile(variables4Background)),
      streams = mergeStrem();

  config.favicon.dimensions.forEach((d) => {
    streams.add(svgSource.pipe(svg2png({ width: d, height: d })));
  });

  return streams
         .pipe(ico("favicon.ico"))
         .pipe(gulp.dest("build/"));
});

gulp.task("html", () => {
  return gulp.src("src/templates/*.html")
         .pipe(nunjucks.compile(variables, { autoescape: false }))
         .pipe(ciEnv ? htmlmin(config.htmlmin) : noop())
         .pipe(gulp.dest("build/"));
});

gulp.task("htmlValidator", () => {
  return gulp.src("build/*.html")
         .pipe(htmlvalidator())
         .pipe(htmlvalidator.reporter());
});

gulp.task("sass", [ "html" ], () => {
  return gulp.src("src/sass/attilanagy.scss")
         .pipe(nunjucks.compile(variables4Background))
         .pipe(sass().on("error", sass.logError))
         .pipe(ciEnv ? postcss([ uncssPlugin, cleanCSSPlugin ]) : noop())
         .pipe(gulp.dest("build/css"));
});

gulp.task("cssValidator", () => {
  return gulp.src("build/css/*.css")
         .pipe(cssValidator());
});

gulp.task("acceptanceTest", () => {
  return gulp.src("src/features/*")
         .pipe(cucumber({
           "steps": "src/features/steps/steps.js",
           "format": "summary"
         }))
});

gulp.task("verify", [ "htmlValidator", "cssValidator" ]);

gulp.task("dist", [ "sass", "favicon" ]);

gulp.task("serve", [ "sass", "favicon" ], () => {
  browserSynch.init( { "server": "build/" });
  gulp.watch("src/favicon/favicon.svg", [ "favicon" ])
  gulp.watch("src/sass/*.scss", [ "sass" ]);
  gulp.watch("src/templates/**/*.html", [ "html" ]);
});
