/*
  Computes the vectorized gradient of the sigmoid function.
*/

const math = require('mathjs');
const sigmoid = require('./sigmoid');

function sigmoidGradient(Z) {
  let sig = sigmoid(Z);
  return math.dotMultiply(sig, math.subtract(1, sig));  
}

module.exports = sigmoidGradient;