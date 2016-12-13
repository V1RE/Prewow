#!/usr/bin/nodejs

const prewow = require("../lib/prewow");
const program = require("commander"); // Easier commandline options
const path = require('path');

var file;

// Set commandline options
program.version('0.0.1');
program.usage('[options] <file ...>');
program.arguments('<afile>');
program.option('-v, --verbose', 'Output developer messages');
program.action(function(afile) {
  file = path.resolve(afile);
});
program.parse(process.argv);

prewow(file);
