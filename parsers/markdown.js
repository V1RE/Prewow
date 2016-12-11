const emoji = require("markdown-it-emoji"); // Markdown emojis
const md = require("markdown-it")(); // Markdown parser
const twemoji = require("twemoji"); // Better emojis by twitter

module.exports = function(data, fn) {
  md.use(emoji);
  md.renderer.rules.emoji = function (token, idx) {
    return '<span style=".emoji{height:1.2em;}">' + twemoji.parse(token[idx].content) + '</span>';
  }

  fn("<style>.emoji{height:1.2em;}</style>" + md.render(data));
}
