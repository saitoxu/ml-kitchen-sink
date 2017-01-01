Convolution and Pooling
---

This is an easy implementation of part of Convolutional Neural Network (CNN) written in JavaScript.

It's easy to understand, so it'll help you to understand convolutional layer and pooling layer in CNN.

## Usage

Prepare for input data like image which consists of binary 0 or 1 as below.

### Input Data

```bash
$ cat sample.dat
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
```

### Example

```js
const fs = require('fs');
const POOLSIZE = 3;
const data = fs.readFileSync('sample.dat');
const ConvolutionalLayer = require('./convolutional-layer');
const PoolingLayer = require('./pooling-layer');
const e = inputData(data.toString());
const filter = [[ 0, 1, 0 ],
                [ 0, 1, 0 ],
                [ 0, 1, 0 ]];

const conv = new ConvolutionalLayer(e, filter);
const pool = new PoolingLayer(POOLSIZE, conv);

conv.calc();
pool.calc();

for (row of pool.layer) {
  console.log(row);
}

function inputData(d) {
  let e = [],
      lines = d.split('\n'),
      line;

  for (let i = 0; i < lines.length - 1; i++) {
    line = lines[i].split(' ');
    e.push(line);
  }
  return e;
}
```

### Result

```bash
$ node example.js
[ 0, 3, 0 ]
[ 0, 3, 0 ]
[ 0, 3, 0 ]
```

## For Detail

For more detail, please see [my blog post](http://saitoxu.io/2017/01/01/convolution-and-pooling.html).
