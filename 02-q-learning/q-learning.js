/**
 *
 */
'use strict';

let random = require('../lib/random.js');

const GEN_MAX = 100;
const ALPHA = 0.1;
const GAMMA = 0.9;
const EPSILON = 0.3;
const REWARD = 1000;
const maze = [
  [ 0, 2, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 1, 1, 0 ],
  [ 0, 1, 0, 0, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 1, 0, 0, 0 ],
  [ 0, 1, 0, 1, 0, 0, 1, 0 ],
  [ 0, 1, 1, 1, 1, 1, 1, 0 ],
  [ 0, 1, 0, 1, 1, 0, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 3, 0 ],
];
const qValues = [];

// initialize Q values
for (let i = 0, size = maze.length; i < size; i++) {
  const row = [];
  for (let j = 0; j < size; j++) {
    row.push(random.get(0, 100, true));
  }
  qValues.push(row);
}
console.log(qValues);

// Q learning
for (let i = 0; i < GEN_MAX; i++) {
  let pos = { row: 0, col: 1 }; // start
  while (maze[pos.row][pos.col] != 3) {
    const next = selectAction(pos);
    qValues[pos.row][pos.col] = updateQValue(next);
    pos = next;
  }
  console.log(qValues);
}

function selectAction(pos) {
  const candidates = getSelectableMoves(pos);
  console.log(candidates);
  let next;

  if (random.get() < EPSILON) {
    const i = random.get(0, candidates.length - 1, true);
    next = candidates[i];
  } else {
    let max = 0, next;
    for (const candidate of candidates) {
      if (qValues[candidate.row][candidate.col] >= max) {
        max = qValues[candidate.row][candidate.col];
        next = candidate;
      }
    }
  }
  return next;
}

function getSelectableMoves(pos) {
  const moves = [];

  if (pos.row != 0 && maze[pos.row - 1][pos.col] != 0) {
    moves.push({ row: pos.row - 1, col: pos.col }); // up
  }
  if (pos.col != maze.length - 1 && maze[pos.row][pos.col + 1] != 0) {
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

function updateQValue(next) {
  let updated = qValues[next.row][next.col];
    /* let updated = qValues[s],
        old = qValues[s],
        max;

    if (s > 6) {
        if (s == 14) {
            updated = old + ALPHA * (REWARD - old);
        }
    } else {
        max = Math.max(qValues[2 * s + 1], qValues[2 * s + 2]);
        updated = old + ALPHA * (GAMMA * max - old);
    }
    return updated; */
}
