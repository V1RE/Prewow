var parser = function(file) {
  const fs = require("fs");
  const path = require("path");

  fs.readFile(file, function (err, data) {
    if (err) {
      throw err;
    } else {
      data = data.toString();
      console.log(data);
      data = "<script src=\"https://code.jquery.com/jquery-3.1.1.min.js\"></script><script src=\"http://mbraak.github.io/jqTree/tree.jquery.js\"></script><script>$(function(){$('.tree').tree({data:"+data+"});});</script><div class=\"tree\"></div>"
      fs.writeFile(path.dirname(file) + "/.preview/index.html", data, function (err) {
        if (err) {
          throw err;
        }
      });
    }
  });
}

module.exports = parser
