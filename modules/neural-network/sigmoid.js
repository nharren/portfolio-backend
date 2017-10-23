/*
  Computes the vectorized sigmoid function.
*/

const math = require('mathjs');

function sigmoid(Z) {
  return math.dotDivide(1, math.add(1, math.exp(math.multiply(-1, Z))));
}

module.exports = sigmoid;