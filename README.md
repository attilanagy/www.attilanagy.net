# www.attilanagy.net

This is my personal web-site. Very simple. It displays links to my social
media profiles.

![Travis Build Status](https://travis-ci.org/attilanagy/www.attilanagy.net.svg?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/attilanagy/www.attilanagy.net/badge.svg)](https://snyk.io/test/github/attilanagy/www.attilanagy.net)

## Technologies

* [Bootstrap][bootstrap] - Managing HTML/CSS Layout
* [Gulp][gulp] - Managing Tasks
* [Simple Icons][simpleicons] - Free SVG Icons
* [Snyk][snyk] - Verifying Dependencies
* [Travis][travis] - CI and Deployment Automation

## HowTo

Install Dependencies

`npm install`

Clean build

`gulp clean`

Generate HTML

`gulp html`

Generate CSS (and HTML as dependency)

`gulp sass`

Start Development Environment

`gulp serve`

Generate Everything For Production Deployment

`gulp dist`

## Deployment

The web-site is hosted on [Google Cloud Storage][gcs]. Every single push to
the *master* branch triggers a [Travis][travis] build what will do the
deployment automatically.

[bootstrap]:    https://getbootstrap.com/
[gulp]:         https://gulpjs.com/
[travis]:       https://travis-ci.org/
[gcs]:          https://cloud.google.com/storage/
[snyk]:         https://snyk.io/
[simpleicons]:  https://simpleicons.org/
