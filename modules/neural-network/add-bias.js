/*
  Adds the bias term to a matrix.
*/

const math = require('mathjs');

function addBias(X) {
  let size = X.size();
  let rows = size[0];
  let cols = size[1];
  let result = math.ones(rows, cols + 1);
  let rowIndexes = math.range(0, rows);
  let colIndexes = math.range(1, cols + 1);
  let index = math.index(rowIndexes, colIndexes);
  return result.subset(index, X);
}

module.exports = addBias;