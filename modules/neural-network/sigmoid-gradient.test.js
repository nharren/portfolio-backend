const math = require('mathjs');
const sigmoidGradient = require('./sigmoid-gradient.js');

test('computes correct values', function() {
  let matrix = math.matrix([-1, 0, 1]);
  let result = sigmoidGradient(matrix);
  let expectedResult = math.matrix([0.19661193324148185, 0.25, 0.19661193324148185]);
  expect(result).toEqual(expectedResult);
});