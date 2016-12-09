var parser = function(file) {
  const emoji = require("markdown-it-emoji"); // Markdown emojis
  const fs = require("fs"); // Filesystem
  const md = require("markdown-it")(); // Markdown parser
  const path = require("path"); // File path checker
  const twemoji = require("twemoji"); // Better emojis by twitter

  md.use(emoji);
  md.renderer.rules.emoji = function (token, idx) {
    return '<span style=".emoji{height:1.2em;}">' + twemoji.parse(token[idx].content) + '</span>';
  }

  fs.readFile(file, function(err, data) {
    if (err) {
      throw err;
    } else {
      data = data.toString();
      data = md.render(data);
      data = "<style>.emoji{height:1.2em;}</style>" + data;
      fs.writeFile(path.dirname(file) + "/.preview/index.html", data, function(err) {
        if (err) {
          throw err;
        }
      });
    }
  });
}

module.exports = parser;
