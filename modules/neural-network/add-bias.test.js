const math = require('mathjs');
const addBias = require('./add-bias.js');

test('adds bias column', function() {
  let matrix = math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  let expectedResult = math.matrix([[1, 1, 2, 3], [1, 4, 5, 6], [1, 7, 8, 9]]);
  let biasedMatrix = addBias(matrix);
  expect(biasedMatrix).toEqual(expectedResult);
});