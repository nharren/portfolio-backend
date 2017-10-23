/*
  Computes the sum of all elements across the given dimension.
*/

const math = require('mathjs');

function sum(X, dim = 0) {
  let size = X.size();
  let rows = size[0];
  let cols = size[1];
  let result = dim === 0 ? math.zeros(1, cols) : math.zeros(rows, 1);
  let dimLength = dim === 0 ? cols : rows;
  let dimRange = math.range(0, dim === 0 ? rows : cols);

  for (let i = 0; i < dimLength; i++) {
    let rowIndexes = dim === 0 ? dimRange : i;
    let colIndexes = dim === 0 ? i : dimRange;
    let vector = X.subset(math.index(rowIndexes, colIndexes));
    let sum = 0;
    if (math.typeof(vector) === 'Matrix') {
      vector.forEach(function(value, index) {
        sum += value;
      });
    } else {
      sum = vector;
    }
    result = result.subset(dim === 0 ? math.index(0, i) : math.index(i, 0), sum);
  }

  return dim === 0 ? math.squeeze(result) : result;
}

module.exports = sum;