# www.attilanagy.net

This is my personal web-site. Very simple. It displays links to my social
media profiles.

![Travis Build Status](https://travis-ci.org/attilanagy/www.attilanagy.net.svg?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/attilanagy/www.attilanagy.net/badge.svg)](https://snyk.io/test/github/attilanagy/www.attilanagy.net)

## Technologies used

* [Bootstrap][bootstrap] -Managing HTML Layout
* [Gulp][gulp] - Managing Tasks
* [Synk][synk] - Verifying Dependencies
* [Travis][travis] - CI and Deployment Automation

## How To...

Install Dependencies

`npm install`

Clean build

`gulp clean`

Generate HTML

`gulp html`

Generate CSS

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
[synk]:         https://snyk.io/
