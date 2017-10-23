const math = require('mathjs');
const removeBias = require('./remove-bias.js');

test('removes bias column', function() {
  let matrix = math.matrix([[1, 1, 2, 3], [1, 4, 5, 6], [1, 7, 8, 9]]);
  let result = removeBias(matrix);
  let expectedResult = math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  expect(result).toEqual(expectedResult);
});