# www.attilanagy.net

This is my personal web-site. Very simple. It displays links to my social
media profiles.

![Travis Build Status](https://travis-ci.org/attilanagy/www.attilanagy.net.svg?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/attilanagy/www.attilanagy.net/badge.svg)](https://snyk.io/test/github/attilanagy/www.attilanagy.net)

## Technologies

* [Bootstrap][bootstrap] - Managing HTML/CSS Layout
* [Cucumber][cucumber] - Acceptance Tests
* [Gulp][gulp] - Managing Tasks
* [Simple Icons][simpleicons] - Free SVG Icons
* [Snyk][snyk] - Verifying Dependencies
* [Travis][travis] - CI and Deployment Automation

## HowTo

Install Dependencies

`npm install`

Clean build

`gulp clean`

Generate Favicon

`gulp favicon`

Generate HTML

`gulp html`

Generate CSS (and HTML as dependency)

`gulp sass`

Generate Sitemap (and CSS / HTML as depedency)

`gulp sitemap`

Start Development Environment

`gulp serve`

Generate Everything For Production Deployment

`gulp dist`

Run Acceptance Tests

`gulp acceptanceTest`

## Deployment

The web-site is hosted on [Firebase][firebase]. Every single push to
the *master* branch triggers a [Travis build][travis_job] build what will do the
deployment automatically.

[bootstrap]:    https://getbootstrap.com/
[gulp]:         https://gulpjs.com/
[travis]:       https://travis-ci.org/
[travis_job]:   https://travis-ci.org/attilanagy/www.attilanagy.net
[firebase]:     https://firebase.google.com/
[snyk]:         https://snyk.io/
[simpleicons]:  https://simpleicons.org/
[cucumber]:     https://cucumber.io/
