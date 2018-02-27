Feature: Simple Web-site
  In order to make my social media profiles easily accessible
  As a motivated professional
  I want to list them on a simple web-site

Scenario Outline: Path is accessible
  Given the address
  When I get "<path>"
  Then the status code is 200

  Examples:
  | path |
  | / |
  | /favicon.ico |
  | /css/attilanagy.css |
