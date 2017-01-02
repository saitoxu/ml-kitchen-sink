const fs = require('fs');
const Filter = require('./filter');
const FCLayer = require('./fclayer');
const InputData = require('./inputdata');
const ConvolutionalLayer = require('../08-convolution-and-pooling/convolutional-layer');
const PoolingLayer = require('../08-convolution-and-pooling/pooling-layer');

const INPUTSIZE = 11;
const FILTERNO = 2;
const FILTERSIZE = 3;
const POOLSIZE = 3;
const POOLOUTSIZE = 3;
const LIMIT = 0.001;
const INITIALERR = 100;
const HIDDENNO = 3;
const ALPHA = 10;

const data = fs.readFileSync('sample.dat');
const input = decode(data.toString());

let filters = [],
    max = POOLOUTSIZE * POOLOUTSIZE * FILTERNO,
    fc = new FCLayer(f, HIDDENNO, ALPHA, max, 1),
    ef = [],
    error = INITIALERR;

for (let i = 0; i < FILTERNO; i++) {
  filters.push(new Filter(FILTERSIZE, INPUTSIZE));
}

while (error > LIMIT) {
  error = 0.0;
  for (let i = 0; i < input.length; i++) {
    let data = new InputData();
    for (let j = 0; j < FILTERNO; j++) {
      let convOut = filters[j].conv(input[i].getImage()),
      poolOut = pool(convOut);

      for (let m = 0; m < POOLOUTSIZE; m++) {
        for (let n = 0; n < POOLOUTSIZE; n++) {
          ef[j * POOLOUTSIZE * POOLOUTSIZE + POOLOUTSIZE * m + n] = poolOut[m][n];
        }
      }
    }
    data.setImage(ef);
    data.setTeacher(input[i].getTeacher());
    let o = fc.forward(data)[0];
    fc.learnOutputLayer(data);
    fc.learnHiddenLayer(data);
    error += (o - input[i].getTeacher()) * (o - input[i].getTeacher());
  }
}

for (let i = 0; i < input.length; i++) {
  let data = new InputData();
  for (let j = 0; j < FILTERNO; j++) {
    let convOut = filters[j].conv(input[i].getImage()),
    poolOut = pool(convOut);

    for (let m = 0; m < POOLOUTSIZE; m++) {
      for (let n = 0; n < POOLOUTSIZE; n++) {
        ef[j * POOLOUTSIZE * POOLOUTSIZE + POOLOUTSIZE * m + n] = poolOut[m][n];
      }
    }
  }
  data.setImage(ef);
  data.setTeacher(input[i].getTeacher());
  let o = fc.forward(data)[0];
  console.log('%d\t%d\t%d', i, input[i].getTeacher(), o);
}

function pool(convOut) {
  let ary, poolOut = [];
  for (let i = 0; i < POOLSIZE; i++) {
    poolOut.push(ary = []);
    for (let j = 0; j < POOLSIZE; j++) {
      ary.push(maxPooling(convOut, i, j));
    }
  }
  return poolOut;
}

function maxPooling(convOut, i, j) {
  let max = 0.0;
  for (let m = POOLOUTSIZE * i; m < POOLOUTSIZE * (i + 1); m++) {
    for (let n = POOLOUTSIZE * j; n < POOLOUTSIZE * (j + 1); n++) {
      if (max < convOut[m][n]) max = convOut[m][n];
    }
  }
  return max;
}

function decode(data) {
  let input = [],
      lines = data.split('\n'),
      indata, image;

  for (let i = 0; i < lines.length - 1; i++) {
    if (i % (INPUTSIZE + 1) == 0) {
      indata = new InputData();
      image = [];
      indata.setTeacher([parseInt(lines[i])]);
      indata.setImage(image);
      input.push(indata);
    } else {
      image.push(lines[i].split(' '));
    }
  }
  return input;
}

function f(u) {
  return 1.0 / (1.0 + Math.exp(-u));
}
