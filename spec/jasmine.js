"use strict";

const args = require('args');
const Database = require('~/app/lib/Database');
const Jasmine = require('jasmine');
const {SpecReporter} = require('jasmine-spec-reporter');

args.option('file', 'spec file to execute');
const flags = args.parse(process.argv);

const jasmine = new Jasmine();
jasmine.loadConfigFile('jasmine.json');
jasmine.clearReporters();
jasmine.addReporter(new SpecReporter({
  spec: {
    displayPending: true,
  },
}));

let file;
if (flags.file) {
  file = [flags.file];
}
Database.connect().then(jasmine.execute(file));
