'use strict';

module.exports.reportIf = function(error) {
  if (error && process.env.DIAGNOSTICS === 'on') {
    console.log(error);
  }
}

module.exports.try = function(callback) {
  try {
    callback();
  }
  catch(error) {
    module.exports.reportIf(error);
  }
}