/*
  Converts a digit (0-9) into a binary flag at the index of the digit.
*/

const math = require('mathjs');

function classifyDigits(digits, numClasses = 10) {
  let numDigits = digits.size()[0];
  let classifiedDigits = math.zeros(numDigits, numClasses);
  digits.forEach(function(value, index) {
    classifiedDigits = classifiedDigits.subset(math.index(index[0], value), 1);
  });
  return classifiedDigits;
}

module.exports = classifyDigits;