const express = require("express");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const program = require("commander");

var file;

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .arguments('<afile>')
  .option('-v, --verbose', 'Output developer messages')
  .action(function(afile) {
    file = afile;
  })
  .parse(process.argv);

var filetype = path.extname(file);
var app = express();

fs.exists(file, function(exists) {
  if (exists) {
    mkfolder(path.dirname(file));
    app.use(express.static(path.dirname(file) + "/.preview"));

    verboselog(file);

    fs.watchFile(file, function(curr, prev) {
      verboselog("File update detected.");
    });
  } else {
    console.log("File specified doesn't exist.");
  }
});

function verboselog(msg) {
  if (program.verbose) {
    console.log(msg);
  }
}

function mkfolder(fullpath) {
  mkdirp(fullpath, function(err) {
    console.log("Unable to create folder");
  });
}
