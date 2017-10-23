const math = require('mathjs');
const cost = require('./cost.js');

test('returns correct values', () => {
  let H = math.matrix([[0.7]]);
  let Y = math.matrix([[1]]);
  let result = cost(H, Y);
  let expectedResult = 0.35667494393873245;
  expect(result).toEqual(expectedResult);
});