#!/usr/bin/nodejs

const prewow = require("../lib/prewow");
const program = require("commander"); // Easier commandline options
const path = require('path');
const argparse = require('argparse').ArgumentParser;

var file;

// // Set commandline options
// program.version('0.0.1');
// program.usage('[options] <file ...>');
// program.arguments('<afile>');
// program.option('-a, --aerbose', 'Output developer messages');
// program.action(function(afile) {
//   file = path.resolve(afile);
// });
// program.parse(process.argv);

var parser = new argparse({
  version: '0.0.1',
  addHelp:true,
  description: 'Prewow, is an easy way to preview different kinds of files'
});
parser.addArgument(
  [ '-V', '--verbose' ],
  {
    help: 'Enable verbose output'
  }
);
parser.addArgument(
  'file',
  {
    help: 'The file to parse'
  }
);
var args = parser.parseArgs();
console.dir(args);

prewow(path.resolve(args.file));
