var parser = function(file) {
  const fs = require("fs");
  const path = require("path");

  fs.readFile(file, function(err, data) {
    if (err) {
      throw err;
    } else {
      fs.writeFile(path.dirname(file) + "/.preview/index.html", data.toString(), function(err) {
        if (err) {
          throw err;
        }
      });
    }
  })
}

module.exports = parser;
