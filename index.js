const fs = require("fs");
const path = require("path");

var filetype = path.extname(process.argv[2]);

console.log(filetype);

fs.watchFile("test.txt", function(curr, prev) {
  console.log(curr);
});
