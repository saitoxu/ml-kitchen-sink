const fs = require('fs');
const POOLSIZE = 3;
const FILTERSIZE = 3;
const data = fs.readFileSync('sample.dat');
const ConvolutionalLayer = require('./convolutional-layer');
const PoolingLayer = require('./pooling-layer');
const image = inputData(data.toString());
const cl = new ConvolutionalLayer(FILTERSIZE);
cl.filter = [[ 0, 1, 0 ],
               [ 0, 1, 0 ],
               [ 0, 1, 0 ]];
const pl = new PoolingLayer(POOLSIZE);
const convImage = cl.conv(image);

for (let row of pl.pool(convImage)) {
  console.log(row);
};

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
