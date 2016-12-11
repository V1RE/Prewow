//
// Created by Niels Mentink aka V1RE
// https://github.com/V1RE/Prewow/
//

// Import node packages
const express = require("express"); // Express-js server
const fs = require("fs"); // Filesystem
const mkdirp = require("mkdirp"); // Directory manager
const path = require("path"); // File path checker
const program = require("commander"); // Easier commandline options
const opn = require("opn"); // Program opener

// Create vars and server
var file;
var filetype;
var fileparser;
var app = express();

// Set commandline options
program.version('0.0.1');
program.usage('[options] <file ...>');
program.arguments('<afile>');
program.option('-v, --verbose', 'Output developer messages');
program.action(function(afile) {
  file = path.resolve(afile);
});
program.parse(process.argv);

// Check if given file exists
fs.exists(file, function(exists) {
  if (exists) {
    // Get filtype from file
    filetype = path.extname(file);

    // Create folder if it doesn't exist
    mkfolder(__dirname + "/server");

    // Start server on port 3000 serving __dirname/server/
    app.use(express.static(__dirname + "/server"));
    app.listen(1337, function() {
      verboselog("Started listening on port 3000");
    });

    // Log filename if verbose enabled
    verboselog(file);

    // Set compiler to be a function
    fileparser = setParser(filetype);

    // Parse file for first time
    readData(file, function (data) {
      fileparser(data, function (parsedData) {
        writePreview(parsedData);
      });
    });

    // Open webbrowser
    opn('http://127.0.0.1:1337');

    // Check for file updates
    fs.watchFile(file, function(curr, prev) {
      verboselog("File update detected.");
      fileparser(file);
    });
  } else {
    // File doesn't exist, exit after giving error
    console.log("File specified doesn't exist.");
  }
});

// only log msg if verbose flag used
function verboselog(msg) {
  if (program.verbose) {
    console.log(msg);
  }
}

// Create folder unless it exists
function mkfolder(fullpath) {
  mkdirp(fullpath, function(err) {
    if (err) {
      // Insufficient permissions or other problems
      console.log("Unable to create folder");
    }
  });
}

// Get parsers from json file
function setParser(filetype) {
  var Parsers = require("./parsers.json");
  // Check for parsers with filetype
  for (var i in Parsers) {
    if (Parsers[i].filetype == filetype) {
      // Set parser to parser file from json file
      return require(Parsers[i].compiler);
    }
  }
}

// Write parsed file to html file
function writePreview(data) {
  fs.writeFile(__dirname + "/server/index.html", data, function(err) {
    if (err) {
      throw err;
    }
  });
}

// Return file contents as string
function readData(originFile, fn) {
  fs.readFile(originFile, function(err, data) {
    if (err) {
      throw err;
    }
    fn(data.toString());
  });
}
