/**
 * Inductive Learning
 *
 * Learning a model which is the best to match training data inductively
 */
'use strict';

const fs = require('fs'),
      LEARNING_COUNT = 10000,
      teachers = readData(fs.readFileSync('learning.txt').toString()),
      size = teachers[0].length - 1;
let bestScore = 0,
    result,
    score,
    candidate;

for (let i = 0; i < LEARNING_COUNT; i++) {
  candidate = makeCandidate(size);
  score = calcScore(candidate, teachers);
  console.log(candidate.join(' ') + ' :score = ' + score);

  if (score > bestScore) {
    result = candidate;
    bestScore = score;
  }
}

console.log('\nBest Answer');
console.log(result.join(' ') + ' :bestScore = ' + bestScore);
console.log('\nCheck');

const testData = readData(fs.readFileSync('test.txt').toString());
console.log('Correct rate: ' + calcScore(result, testData) + ' / ' + testData.length);

/**
 * Calculate score of given candidate
 *
 * @param  {Array} candidate
 * @param  {Array} teachers
 * @return {Number} score
 */
function calcScore(candidate, teachers) {
  const dataSize = candidate.length,
        maxPoint = dataSize,
        resultDataIdx = dataSize;
  let score = 0,
      point,
      teacher;

  for (let i = 0; i < teachers.length; i++) {
    point = 0, teacher = teachers[i];

    for (let j = 0; j < dataSize; j++) {
      if (candidate[j] == 2 || candidate[j] == teacher[j]) {
        point++;
      }
    }

    if ((point == maxPoint && teacher[resultDataIdx] == 1) ||
        (point != maxPoint && teacher[resultDataIdx] == 0)) {
      score++;
    }
  }
  return score;
}

/**
 * Read data from file
 *
 * @param  {String} data
 * @return {Array}
 */
function readData(data) {
  const lines = data.split('\n'),
        dataAry = [];

  for (let i = 0; i < lines.length - 1; i++) {
    dataAry.push(lines[i].split(' ').map(value => {
      return parseInt(value);
    }));
  }
  return dataAry;
}

/**
 * Create a candidate
 *
 * @param  {Number} size
 * @return {Array} candidate
 */
function makeCandidate(size) {
  const candidate = [];

  for (let i = 0; i < size; i++) {
    candidate.push(Math.floor(Math.random() * 3));
  }
  return candidate;
}
