/*
  Removes the bias term from a matrix.
*/

const math = require('mathjs');

function removeBias(X) {
  let size = X.size();
  let rows = size[0];
  let cols = size[1];
  let rowIndexes = math.range(0, rows);
  let colIndexes = math.range(1, cols);
  let index = math.index(rowIndexes, colIndexes);
  return X.subset(index);
}

module.exports = removeBias;