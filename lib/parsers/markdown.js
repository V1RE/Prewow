const emoji = require("markdown-it-emoji"); // Markdown emojis
const md = require("markdown-it")(); // Markdown parser
const twemoji = require("twemoji"); // Better emojis by twitter

module.exports = function(data, fn) {
  md.use(emoji); // Enable emojis in markdown-it
  md.renderer.rules.emoji = function (token, idx) {
    return '<span>' + twemoji.parse(token[idx].content) + '</span>'; // Use twitter emojis
  }

  fn("<style>.emoji{height:1.2em;}</style>" + md.render(data)); // Make emojis 1.2em high, and render md to html
}
