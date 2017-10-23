'use strict';

let diagnostics = {};

diagnostics.reportIf = function(error) {
  if (error && process.env.DIAGNOSTICS === 'on') {
    console.log(error);
  }
}

diagnostics.try = function(callback) {
  try {
    callback();
  }
  catch(error) {
    diagnostics.reportIf(error);
  }
}

module.exports = diagnostics;