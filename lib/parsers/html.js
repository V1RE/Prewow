module.exports = function(data, fn) {
  fn(data); // Just return the data
};

module.exports.File = {
  "filetype": ".html",
  "compiler": "./parsers/html.js"
};
