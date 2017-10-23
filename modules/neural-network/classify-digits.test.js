const math = require('mathjs');
const classifyDigits = require('./classify-digits.js');

test('returns correctly sized matrix', () => {
  let digits = math.matrix([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]);
  let classifiedDigits = classifyDigits(digits);
  let classifiedDigitsSize = classifiedDigits.size();
  expect(classifiedDigitsSize[0]).toBe(10);
  expect(classifiedDigitsSize[1]).toBe(10);
});

test('returns correct values', () => {
  let digits = math.matrix([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]);
  let classifiedDigits = classifyDigits(digits);
  let eye = math.eye(10);
  expect(classifiedDigits).toEqual(eye);
});