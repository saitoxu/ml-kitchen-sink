const fs = require('fs');
const BackPropagation = require('./back-propagation');

const ALPHA =   10;
const LIMIT = 0.01;
const IN    =    3;
const MID   =    3;

const data = fs.readFileSync('data.txt');
const e = initInput(data);
const bp = new BackPropagation(e, ALPHA, LIMIT, IN, MID, sigmoid);

bp.learn();
bp.result();

function sigmoid(u) {
  return 1.0 / (1.0 + Math.exp(-u));
}

function initInput(data) {
  let lines = data.toString().split('\n'),
      inputs = [], input, tmp, i;

  for (i = 0; i < lines.length - 1; i++) {
    tmp = lines[i].split(' ');
    input = [];
    tmp.forEach(i => {
      input.push(parseInt(i));
    });
    inputs.push(input);
  }
  return inputs;
}
