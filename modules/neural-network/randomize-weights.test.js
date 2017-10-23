const math = require('mathjs');
const randomizeWeights = require('./randomize-weights.js');

test('returns the correct size matrix', () => {
  let inputLayerSize = 10;
  let hiddenLayerSize = 15;
  let epsilon = 0.12;
  let theta = randomizeWeights(inputLayerSize, hiddenLayerSize, epsilon);
  let size = math.size(theta);
  expect(size[0]).toBe(hiddenLayerSize);
  expect(size[1]).toBe(inputLayerSize + 1);
});

test('values are within epsilon from 0', () => {
  let inputLayerSize = 10;
  let hiddenLayerSize = 15;
  let epsilon = 0.12;
  let theta = randomizeWeights(inputLayerSize, hiddenLayerSize, epsilon);
  theta.forEach(function(row, index) {
    row.forEach(function(value, index) {
      expect(value).toBeGreaterThanOrEqual(-epsilon);
      expect(value).toBeLessThanOrEqual(epsilon);
    });
  });
});