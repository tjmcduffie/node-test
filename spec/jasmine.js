"use strict";

const Jasmine = require('jasmine');
const {SpecReporter} = require('jasmine-spec-reporter');

const jasmine = new Jasmine();
jasmine.loadConfigFile('jasmine.json');
jasmine.clearReporters();
jasmine.addReporter(new SpecReporter({
  spec: {
    displayPending: true,
  },
}));
jasmine.execute()
