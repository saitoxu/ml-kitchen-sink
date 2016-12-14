# Back Propagation

It is a supervised learning algorithm for learning a neural network.

# Usage

Prepare for input data.

The first three of each row are input data, The last one is the correct output data.

## Input Data
```bash
$ cat data.txt
1 1 1 1
1 1 0 1
1 0 1 1
1 0 0 0
0 1 1 1
0 1 0 0
0 0 1 0
0 0 0 0
```

## Example Program
```js
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
```

## Result
```bash
$ node example.js
[ 1, 1, 1, 1 ] 0.9975867553861153
[ 1, 1, 0, 1 ] 0.995497018073595
[ 1, 0, 1, 1 ] 0.9905236193610647
[ 1, 0, 0, 0 ] 0.03232665554956693
[ 0, 1, 1, 1 ] 0.9931934488128437
[ 0, 1, 0, 0 ] 0.046925698005279876
[ 0, 0, 1, 0 ] 0.02273183453262245
[ 0, 0, 0, 0 ] 0.01607439769599071
```
