var parser = function(file) {
  const fs = require("fs"); // Filesystem
  const md = require("marked"); // Markdown parser
  const path = require("path"); // File path checker

  fs.readFile(file, function(err, data) {
    if (err) {
      throw err;
    } else {
      fs.writeFile(path.dirname(file) + "/.preview/index.html", md(data.toString()), function(err) {
        if (err) {
          throw err;
        }
      });
    }
  });
}

module.exports = parser;
