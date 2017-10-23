const math = require('mathjs');
const sum = require('./sum.js');

test('computes correct row sum', function() {
  let matrix = math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  let result = sum(matrix, 0);
  let expectedResult = math.matrix([12, 15, 18]);
  expect(result).toEqual(expectedResult);
});

test('computes correct column sum', function() {
  let matrix = math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  let result = sum(matrix, 1);
  let expectedResult = math.matrix([[6], [15], [24]]);
  expect(result).toEqual(expectedResult);
});