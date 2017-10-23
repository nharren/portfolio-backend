'use strict';

const math = require('mathjs');
const randomizeWeights = require('./randomize-weights.js');
const classifyDigits = require('./classify-digits.js');
const addBias = require('./add-bias.js');
const removeBias = require('./remove-bias.js');
const sigmoid = require('./sigmoid.js');
const sigmoidGradient = require('./sigmoid-gradient.js');
const cost = require('./cost.js');

function NeuralNetwork(inputLayerSize, hiddenLayerSize, outputLayerSize) {
  this.epsilon = 0.12;
  this.inputLayerSize = inputLayerSize;
  this.hiddenLayerSize = hiddenLayerSize;
  this.outputLayerSize = outputLayerSize;
  this.theta1 = randomizeWeights(inputLayerSize, hiddenLayerSize, this.epsilon);
  this.theta2 = randomizeWeights(hiddenLayerSize, outputLayerSize, this.epsilon);
}

NeuralNetwork.prototype.train = function(X, Y, iterations) {
  let m = X.size()[0];
  
  for (let i = 0; i < iterations; i++) {
    // Forward Propagation
    let layer1 = addBias(X);
    let z2 = math.multiply(layer1, math.transpose(this.theta1));
    let layer2 = addBias(sigmoid(z2));
    let z3 = math.multiply(layer2, math.transpose(this.theta2));
    let H = sigmoid(z3);
    
    let J = math.chain(H)
                .subtract(Y)
                .dotPow(2)
                .multiply(0.5)
                .done();
    console.log(`Cost: ${J}`);

    // Backpropagation
    let delta3 = math.subtract(H, Y);
    let delta2 = math.chain(delta3)
                     .multiply(removeBias(this.theta2))
                     .dotMultiply(sigmoidGradient(z2))
                     .done();
    let Delta1 = math.multiply(math.transpose(delta2), layer1);
    let Delta2 = math.multiply(math.transpose(delta3), layer2);
    let theta1Grad = math.multiply(1 / m, Delta1);
    let theta2Grad = math.multiply(1 / m, Delta2);
    this.theta1 = math.subtract(this.theta1, theta1Grad);
    this.theta2 = math.subtract(this.theta2, theta2Grad);
  }
}

NeuralNetwork.prototype.predict = function(X) {
  let layer1 = addBias(X);
  let z2 = math.multiply(layer1, math.transpose(this.theta1));
  let layer2 = addBias(sigmoid(z2));
  let z3 = math.multiply(layer2, math.transpose(this.theta2));
  return sigmoid(z3);
}

module.exports = NeuralNetwork;