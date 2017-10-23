const math = require('mathjs');
const sigmoid = require('./sigmoid.js');

test('computes correct values', function() {
  let matrix = math.matrix([-1, 0, 1]);
  let result = sigmoid(matrix);
  let expectedResult = math.matrix([0.2689414213699951, 0.5, 0.7310585786300049]);
  expect(result).toEqual(expectedResult);
});