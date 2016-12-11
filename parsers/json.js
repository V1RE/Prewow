const nodedump = require('nodedump').dump;

module.exports = function(data, fn) {
  fn("<pre> " + nodedump(JSON.parse(data)) + " </pre>");
}
