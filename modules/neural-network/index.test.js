const math = require('mathjs');
const NeuralNetwork = require('./index.js');

test('learns correct parameters', () => {
  let neuralNetwork = new NeuralNetwork(2, 2, 2);
  neuralNetwork.theta1 = math.matrix([[.35,.15,.2],[.35,.25,.3]]);
  neuralNetwork.theta2 = math.matrix([[.6,.4,.45],[.6,.5,.55]]);
  let X = math.matrix([[.05,.1]]);
  let Y = math.matrix([[.01,.99]]);
  neuralNetwork.train(X, Y, 500);
  let prediction = neuralNetwork.predict(X);
  let error = math.subtract(prediction, Y);

  console.log(`Prediction: ${math.string(prediction.valueOf())}`);

  expect(error.get([0,0])).toBeLessThan(1E-6);
  expect(error.get([0,1])).toBeLessThan(1E-6);
});