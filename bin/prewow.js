#!/usr/bin/nodejs

const prewow = require("../lib/prewow");
const path = require('path');
const argparse = require('argparse').ArgumentParser;

var file;

var parser = new argparse({
  version: require('../package.json').version,
  addHelp:true,
  prog: 'prewow',
  description: 'Prewow, is an easy way to preview different kinds of files'
});
parser.addArgument(
  '--verbose',
  {
    help: 'Enable verbose output',
    action: 'storeTrue'
  }
);
parser.addArgument(
  ['-i', '--install'],
  {
    help: 'Install new parsers',
  }
)
parser.addArgument(
  'file',
  {
    help: 'The file to parse'
  }
);

prewow(JSON.stringify(parser.parseArgs()));
