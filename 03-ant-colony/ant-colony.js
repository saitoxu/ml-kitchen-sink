/**
 * Ant Colony
 *
 * 
 */
'use strict';

const random = require('../lib/random.js');
const NOA = 10;
const ILIMIT = 100;
const Q = 3;
const RHO = 0.8;
const STEP = 4;
const EPSILON = 0.15;

let distance, pheromone, mstep;

init();

for (let i = 0; i < ILIMIT; i++) {
  walk();
  update();
}

function update() {
  let sum = 0, min = 100, minAnt = -1;

  for (let i = 0; i < pheromone.length; i++) {
    for (let j = 0; j < pheromone[i].length; j++) {
      pheromone[i][j] *= RHO;
    }
  }

  for (let m = 0; m < NOA; m++) {
    let d = distance[0][mstep[m][0]];
    for (let i = 1; i < STEP; i++) {
      d += distance[mstep[m][i - 1]][mstep[m][i]];
    }
    if (min > d) {
      min = d;
      minAnt = m;
    }

    sum += d;
  }

  pheromone[0][mstep[minAnt][0]] += Q * (1 / min);
  for (let i = 1; i < STEP; i++) {
    pheromone[mstep[minAnt][i - 1]][mstep[minAnt][i]] += Q * (1 / min);
  }

  console.log('Average distance: ' + sum / NOA);
}

function walk() {
  for (let m = 0; m < NOA; m++) {
    mstep[m] = [ 0, 0, 0, 0 ]; // clear
    for (let s = 0; s < STEP; s++) {
      const current = s > 0 ? mstep[m][s - 1] : 0;
      if (random.get() < EPSILON || calcMaxDiffPheromons(current, mstep[m]) < 1e-9) {
        mstep[m][s] = nextRandomStep(current, mstep[m]);
      } else {
        mstep[m][s] = nextMaxStep(current, mstep[m]);
      }
    }
  }
}

function nextRandomStep(current, step) {
  const leftPoints = getLeftPoints(step),
        next = random.get(0, leftPoints.length - 1, true);
  return leftPoints[next];
}

function nextMaxStep(current, step) {
  const leftPoints = getLeftPoints(step),
        leftPointPheromons = getLeftPointPheromons(current, step);
  let max = 0;

  for (let i = 1; i < leftPointPheromons.length; i++) {
    if (leftPointPheromons[i] > leftPointPheromons[max])
      max = i;
  }
  return leftPoints[max];
}

function calcMaxDiffPheromons(current, step) {
  const leftPointPheromons = getLeftPointPheromons(current, step),
        max = Math.max.apply({}, leftPointPheromons),
        min = Math.min.apply({}, leftPointPheromons);
  return Math.abs(max - min);
}

function getLeftPointPheromons(current, step) {
  const leftPoints = getLeftPoints(step),
        leftPointPheromons = [];

  for (let i = 0; i < leftPoints.length; i++) {
    leftPointPheromons.push(pheromone[current][leftPoints[i]]);
  }
  return leftPointPheromons;
}

function getLeftPoints(step) {
  let leftPoints = [ 1, 2, 3, 4 ];

  for (let i = 0; i < step.length && step[i] > 0; i++) {
    leftPoints = leftPoints.filter(j => {
      return j != step[i];
    });
  }
  return leftPoints;
}

function init() {
  distance = [
    //  s    a    b    c    d
    [ 0.0, 4.0, 4.0, 4.7, 5.0 ], // start
    [ 0.0, 0.0, 1.2, 2.5, 1.7 ], // a
    [ 0.0, 1.2, 0.0, 1.0, 1.4 ], // b
    [ 0.0, 2.5, 1.0, 0.0, 2.0 ], // c
    [ 0.0, 1.7, 1.4, 2.0, 0.0 ]  // d
  ];

  pheromone = [
    [ 0.0, 0.0, 0.0, 0.0, 0.0 ],
    [ 0.0, 0.0, 0.0, 0.0, 0.0 ],
    [ 0.0, 0.0, 0.0, 0.0, 0.0 ],
    [ 0.0, 0.0, 0.0, 0.0, 0.0 ],
    [ 0.0, 0.0, 0.0, 0.0, 0.0 ]
  ];

  mstep = [];
  for (let i = 0; i < NOA; i++) {
    mstep.push([ 0, 0, 0, 0 ]);
  }
}
