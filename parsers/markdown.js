var parser = function (file) {
  const fs = require("fs");                           // Filesystem
  const md = require("marked");                       // Markdown parser
  const path = require("path");                       // File path checker

  var Data;

  console.log(file);
  fs.readFile(file, function (err, data) {
    if (err) {
      throw err;
    } else {
      console.log(data);
      Data = data.toString();

      fs.writeFile(path.dirname(file) + "/.preview/index.html", md(Data)), function (err) {
        if(err) {
          throw err;
        }
      };
    }
  });

}

module.exports = parser;
