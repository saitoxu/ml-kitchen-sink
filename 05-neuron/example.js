const fs = require('fs');
const Neuron = require('./neuron');
const data = fs.readFileSync('data.txt');
const input = initInput(data);
const w = [ 1, 1 ];
const v = 1.5;
const neuron = new Neuron(w, v, u => {
  return u >= 0 ? 1 : 0;
});

for (let i = 0; i < input.length; i++) {
  console.log(input[i], neuron.forward(input[i]));
}

function initInput(data) {
  const lines = data.toString().split('\n');
  let input = [];

  for (let i = 0; i < lines.length - 1; i++) {
    const inputs = lines[i].split(' ');
    input.push([ parseInt(inputs[0]), parseInt(inputs[1]) ]);
  }
  return input;
}
