const fs = require('fs');
const FCLayer = require('./fclayer');
const InputData = require('./inputdata');
const CNN = require('./cnn');
const ConvolutionalLayer = require('../08-convolution-and-pooling/convolutional-layer');
const PoolingLayer = require('../08-convolution-and-pooling/pooling-layer');

const IMAGESIZE = 11;
const FILTERSIZE = 3;
const POOLSIZE = 3;
const LIMIT = 0.001;
const INITIALERR = 100;
const HIDDENNO = 3;
const ALPHA = 10;

const data = fs.readFileSync('sample.dat');
const images = decode(data.toString());

let max = POOLSIZE * POOLSIZE,
    error = INITIALERR;

const cl1 = new ConvolutionalLayer(FILTERSIZE);
const cl2 = new ConvolutionalLayer(FILTERSIZE);
const pl  = new PoolingLayer(POOLSIZE);
const fc  = new FCLayer(sigmoid, HIDDENNO, ALPHA, max, 1);

while (error > LIMIT) {
  error = 0.0;

  learn(false);
}

learn(true);

function learn(showResult) {
  for (let image of images) {
    let co1 = cl1.conv(image.getImage()),
        co2 = cl2.conv(co1),
        po  = pl.pool(co2),
        ef  = [];

    for (let m = 0; m < POOLSIZE; m++) {
      for (let n = 0; n < POOLSIZE; n++) {
        ef[POOLSIZE * m + n] = po[m][n];
      }
    }

    let data = new InputData();
    data.setImage(ef);
    data.setTeacher(image.getTeacher());

    let o = fc.forward(data)[0];
    fc.learnOutputLayer(data);
    fc.learnHiddenLayer(data);
    error += (o - image.getTeacher()) * (o - image.getTeacher());
    if (showResult)
      console.log('%d\t%d', image.getTeacher(), o);
  }
}

function decode(data) {
  let images = [],
      lines = data.split('\n'),
      indata,
      image;

  for (let i = 0; i < lines.length - 1; i++) {
    if (i % (IMAGESIZE + 1) == 0) {
      indata = new InputData();
      image = [];
      indata.setTeacher([parseInt(lines[i])]);
      indata.setImage(image);
      images.push(indata);
    } else {
      image.push(lines[i].split(' '));
    }
  }
  return images;
}

function sigmoid(u) {
  return 1.0 / (1.0 + Math.exp(-u));
}
