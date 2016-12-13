const nodedump = require('nodedump').dump; // A nice visualisation of json

module.exports = function(data, fn) {
  fn("<pre> " + nodedump(JSON.parse(data)) + " </pre>"); // Put everything between pre's and return the rendered json
};

module.exports.File = {
  "filetype": ".json",
  "compiler": "./parsers/json.js"
};
