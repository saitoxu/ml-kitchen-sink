const fs = require('fs');
const POOLSIZE = 3;
const data = fs.readFileSync('sample.dat');
const ConvolutionLayer = require('./convolution-layer');
const PoolingLayer = require('./pooling-layer');
const e = inputData(data.toString());
const filter = [[ 0, 1, 0 ],
                [ 0, 1, 0 ],
                [ 0, 1, 0 ]];

const conv = new ConvolutionLayer(e, filter);
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
