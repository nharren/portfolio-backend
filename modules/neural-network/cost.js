/*
  Calculates the vectorized cost function.
*/

const math = require('mathjs');
const sum = require('./sum.js');

function cost(H, Y) {
  let y1 = math.chain(Y)
               .multiply(-1)
               .multiply(math.log(H))
               .done();
  let y0 = math.chain(1)
               .subtract(Y)
               .multiply(math.log(math.subtract(1, H)))
               .done()
  let loss = math.subtract(y1, y0);
  return math.multiply(1 / H.size()[0], sum(sum(loss, 1)));
}

module.exports = cost;