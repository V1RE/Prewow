const fs = require("fs");
const path = require("path");
const express = require("express");
const program = require("commander");

var file;

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .arguments('<afile>')
  .option('-v, --verbose', 'Output developer messages')
  .action(function (afile) {
    file = afile;
  })
  .parse(process.argv);

var filetype = path.extname(file);
var app = express();

app.use(express.static(path.dirname(file) + "/.preview"));

console.log(filetype);
console.log(program.verbose);

fs.watchFile(file, function(curr, prev) {
  console.log(curr);
});
