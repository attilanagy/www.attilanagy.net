const { Given, When, Then, setWorldConstructor } = require("cucumber");

var buildUrl = require("build-url"),
    fetch = require("node-fetch"),
    expect = require("chai").expect;

function MyWorld() {
    this.URL = null;
    this.status = null;
};

setWorldConstructor(MyWorld);

Given('the address', function () {
    this.URL = "https://www.attilanagy.net"
});

When('I get {string}', function (path) {
    return fetch(buildUrl(this.URL, { path: path }))
        .then((response) => {this.status = response.status});
});

Then('the status code is {int}', function (statusCode) {
    expect(this.status).to.equal(statusCode);
});
