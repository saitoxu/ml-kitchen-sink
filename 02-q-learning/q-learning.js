/**
 * Q Learning
 *
 * TODO
 */
'use strict';

let random = require('../lib/random.js');

const GEN_MAX = 1000;
const ALPHA = 0.1;
const GAMMA = 0.9;
const EPSILON = 0.3;
const REWARD = 1000;
/* const maze = [
  [ 0, 2, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 1, 1, 0 ],
  [ 0, 1, 0, 0, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 1, 0, 0, 0 ],
  [ 0, 1, 0, 1, 0, 0, 1, 0 ],
  [ 0, 1, 1, 1, 1, 1, 1, 0 ],
  [ 0, 1, 0, 1, 1, 0, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 3, 0 ],
]; */
const maze = [
  [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1, 1, 1, 0 ],
  [ 0, 1, 0, 0, 1, 1, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 1, 0, 0, 1, 1, 0 ],
  [ 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1, 1, 1, 0 ],
  [ 0, 1, 0, 1, 1, 1, 1, 0, 1, 3 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];
const qValues = [];

// initialize Q values
for (let i = 0; i < maze.length; i++) {
  const row = [];
  for (let j = 0; j < maze[0].length; j++) {
    row.push(random.get(0, 100, true));
  }
  qValues.push(row);
}

// Q learning
for (let i = 0; i < GEN_MAX; i++) {
  let pos = { row: 0, col: 1 }; // start
  while (maze[pos.row][pos.col] != 3) {
    const next = selectAction(pos, EPSILON);
    qValues[pos.row][pos.col] = updateQValue(pos, next);
    pos = next;
  }
}

// Print
{
  let pos = { row: 0, col: 1 };
  while (maze[pos.row][pos.col] != 3) {
    const next = selectAction(pos, 0);
    maze[pos.row][pos.col] = 4;
    pos = next;
  }

  const yellow   = '\u001b[33m',
        reset   = '\u001b[0m';
  for (let i = 0; i < maze.length; i++) {
    let line = '';
    for (let j = 0; j < maze[0].length; j++) {
      if (maze[i][j] == 4) {
        line += yellow + maze[i][j] + reset + ' ';
      } else {
        line += maze[i][j] + ' ';
      }
    }
    console.log(line);
  }
}

/**
 * TODO
 * @param  {Object} pos
 * @param  {Number} epsilon
 * @return {Object} next
 */
function selectAction(pos, epsilon) {
  const candidates = getSelectableMoves(pos);
  let next;

  if (random.get() < epsilon) {
    const i = random.get(0, candidates.length - 1, true);
    next = candidates[i];
  } else {
    let max = 0;
    for (const candidate of candidates) {
      const reward = maze[candidate.row][candidate.col] == 3 ? REWARD : 0;
      if (qValues[candidate.row][candidate.col] + reward >= max) {
        max = qValues[candidate.row][candidate.col] + reward;
        next = candidate;
      }
    }
  }
  return next;
}

/**
 * TODO
 * @param  {Object} pos
 * @return {Array}
 */
function getSelectableMoves(pos) {
  const moves = [];

  if (pos.row != 0 && maze[pos.row - 1][pos.col] != 0) {
    moves.push({ row: pos.row - 1, col: pos.col }); // up
  }
  if (pos.col != maze[0].length - 1 && maze[pos.row][pos.col + 1] != 0) {
    moves.push({ row: pos.row, col: pos.col + 1 }); // right
  }
  if (pos.row != maze.length - 1 && maze[pos.row + 1][pos.col] != 0) {
    moves.push({ row: pos.row + 1, col: pos.col }); // down
  }
  if (pos.col != 0 && maze[pos.row][pos.col - 1] != 0) {
    moves.push({ row: pos.row, col: pos.col - 1 }); // left
  }

  return moves;
}

/**
 * TODO
 * @param  {Object} pos
 * @param  {Object} next
 * @return {Number} qValue
 */
function updateQValue(pos, next) {
  let currQ = qValues[pos.row][pos.col],
      nextQ = qValues[next.row][next.col],
      reward = maze[next.row][next.col] == 3 ? REWARD : 0;

  return currQ + ALPHA * (reward + GAMMA * nextQ - currQ);
}
