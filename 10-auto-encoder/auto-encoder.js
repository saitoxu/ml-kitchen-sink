'use strict';

const fs = require('fs'),
      InputData = require('../09-cnn/inputdata.js'),
      FCLayer = require('../09-cnn/fclayer.js'),
      INPUTSIZE = 9,
      OUTPUTSIZE = 9,
      HIDDENNO = 2,
      ALPHA = 10,
      INITIALERR = 100,
      LIMIT = 0.001;

fs.readFile('data.txt', (err, data) => {
  const input = decode(data.toString());
  let error = INITIALERR, o;
  const fc = new FCLayer(f, HIDDENNO, INPUTSIZE, ALPHA, OUTPUTSIZE);

  while (error > LIMIT) {
    error = 0.0;
    for (let j = 0; j < input.length; j++) {
      o = fc.forward(input[j].getImage());
      for (let k = 0; k < OUTPUTSIZE; k++) {
        error += (o[k] - input[j].getTeacher()[k]) * (o[k] - input[j].getTeacher()[k]);
      }
      console.log("error = %d", error);
    }
  }
  console.log("end");

  function decode(data) {
    let input = [], image, teacher;
    const lines = data.split('\n');

    for (let i = 0; i < lines.length - 1; i++) {
      const indata = new InputData(),
            ary = lines[i].split(' ');
      indata.setImage(image = []);
      indata.setTeacher(teacher = []);
      let j = 0;
      for (j = 0; j < INPUTSIZE; j++) {
          image.push(ary[j]);
      }
      for (;j < ary.length; j++) {
          teacher.push(ary[j]);
      }
      input.push(indata);
    }
    return input;
  }

  function f(u) {
      return 1.0 / (1.0 + Math.exp(-u));
  }
});
