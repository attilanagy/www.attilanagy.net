'use strict';

var $ = require("gulp-load-plugins")(),
    browserSynch = require("browser-sync").create(),
    ciEnv = process.env.CI ? true : false,
    config = require("./site-config.json"),
    cleancssPlugin = require("postcss-clean"),
    del = require("del"),
    gulp = require("gulp"),
    icons = require("simple-icons"),
    mergeStrem = require("merge-stream"),
    noop = require("through2").obj,
    uncssPlugin = require("postcss-uncss")({ html: [ "build/*.html" ]}),
    variables = { icons: icons, links: config.links, ciEnv: ciEnv },
    variables4Background = { backgroundColor: config.backgroundColor };

gulp.task("clean", () => {
  return del([ "build/" ]);
});

gulp.task("favicon", () => {
  var svgSource = gulp.src("src/favicon/favicon.svg")
                  .pipe($.nunjucks.compile(variables4Background)),
      streams = mergeStrem();

  config.favicon.dimensions.forEach((d) => {
    streams.add(svgSource.pipe($.svg2png({ width: d, height: d })));
  });

  return streams
         .pipe($.toIco("favicon.ico"))
         .pipe(gulp.dest("build/"));
});

gulp.task("html", () => {
  return gulp.src("src/templates/*.html")
         .pipe($.nunjucks.compile(variables, { autoescape: false }))
         .pipe(ciEnv ? $.htmlmin(config.htmlmin) : noop())
         .pipe(gulp.dest("build/"));
});

gulp.task("htmlValidator", () => {
  return gulp.src("build/*.html")
         .pipe($.w3cjs())
         .pipe($.w3cjs.reporter());
});

gulp.task("sass", [ "html" ], () => {
  return gulp.src("src/sass/attilanagy.scss")
         .pipe($.nunjucks.compile(variables4Background))
         .pipe($.sass().on("error", $.sass.logError))
         .pipe(ciEnv ? $.postcss([ uncssPlugin, cleancssPlugin ]) : noop())
         .pipe(gulp.dest("build/css"));
});

gulp.task("cssValidator", () => {
  return gulp.src("build/css/*.css")
         .pipe($.w3cCss());
});

gulp.task("sitemap", [ "sass" ], () => {
  return gulp.src("build/*.html", { read: false })
         .pipe($.sitemap({ siteUrl: config.siteUrl }))
         .pipe(gulp.dest("build/"));
});

gulp.task("cert", () => {
  return gulp.src("src/certs/email.pem")
         .pipe(gulp.dest("build/"));
});

gulp.task("acceptanceTest", () => {
  return gulp.src("src/features/*")
         .pipe($.cucumber({
           "steps": "src/features/steps/steps.js",
           "format": "summary"
         }))
});

gulp.task("verify", [ "htmlValidator", "cssValidator" ]);

gulp.task("dist", [ "sitemap", "favicon", "cert" ]);

gulp.task("serve", [ "sitemap", "favicon" ], () => {
  browserSynch.init( { "server": "build/" });
  gulp.watch("src/favicon/favicon.svg", [ "favicon" ])
  gulp.watch("src/sass/*.scss", [ "sass" ]);
  gulp.watch("src/templates/**/*.html", [ "html" ]);
});
