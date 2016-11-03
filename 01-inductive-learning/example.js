'use strict';

const InductiveLearning = require('./inductive-learning');
const fs = require('fs');
const teachers = readData(fs.readFileSync('learning.txt').toString());
const testData = readData(fs.readFileSync('test.txt').toString());
const il = new InductiveLearning(10000);

il.fit(teachers);
console.log(il.predict(testData));

function readData(data) {
  const lines = data.split('\n');
  const dataAry = [];

  for (let i = 0; i < lines.length - 1; i++) {
    dataAry.push(lines[i].split(' ').map(value => {
      return parseInt(value);
    }));
  }
  return dataAry;
}
