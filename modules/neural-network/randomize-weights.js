const math = require('mathjs');

function randomizeWeights(layerInSize, layerOutSize, epsilon) {
  return math.chain(math.random([layerOutSize, layerInSize + 1]))
             .multiply(2 * epsilon)
             .subtract(epsilon)
             .done();
}

module.exports = randomizeWeights;