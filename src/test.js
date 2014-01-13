'use strict';
var fs = require('fs');
var gherkin = require('./gherkin');

var file = fs.readFileSync('sample.feature');
var feature = gherkin.parse(file.toString());

console.log('feature:', feature.name);
feature.scenarios.forEach(console.dir);
