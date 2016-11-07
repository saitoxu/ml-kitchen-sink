const random = require('../lib/random');

class QLearning {
  constructor(maze, alpha, gamma, epsilon, max, reward) {
    this._maze = maze;
    this._alpha = alpha;
    this._gamma = gamma;
    this._epsilon = epsilon;
    this._max = max;
    this._reward = reward;
    this._qValues = this._initQValues(maze);
    this._start = this._findStartPos(maze);
  }

  learn() {
    for (let i = 0; i < this._max; i++) {
      let pos = this._start;
      while (this._maze[pos.row][pos.col] != 3) {
        const next = this._selectAction(pos, this._epsilon);
        this._qValues[pos.row][pos.col] = this._updateQValue(pos, next);
        pos = next;
      }
    }
  }

  print() {
    const yellow = '\u001b[33m';
    const reset = '\u001b[0m';
    let pos = this._start;
    while (this._maze[pos.row][pos.col] != 3) {
      const next = this._selectAction(pos, 0);
      this._maze[pos.row][pos.col] = 4;
      pos = next;
    }

    for (let i = 0; i < this._maze.length; i++) {
      let line = '';
      for (let j = 0; j < this._maze[0].length; j++) {
        if (this._maze[i][j] == 4) {
          line += yellow + this._maze[i][j] + reset + ' ';
        } else {
          line += this._maze[i][j] + ' ';
        }
      }
      console.log(line);
    }
  }

  _initQValues(maze) {
    const qValues = [];
    for (let i = 0; i < maze.length; i++) {
      const row = [];
      for (let j = 0; j < maze[0].length; j++) {
        row.push(random.get(0, 100, true));
      }
      qValues.push(row);
    }
    return qValues;
  }

  _findStartPos(maze) {
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[0].length; j++) {
        if (maze[i][j] == 2)
          return { row: i, col: j };
      }
    }
    throw new Error('There must be a start position.');
  }

  _selectAction(pos, epsilon) {
    const candidates = this._getSelectableMoves(pos);
    let next;

    // epsilon-greedy method
    if (random.get() < epsilon) {
      const i = random.get(0, candidates.length - 1, true);
      next = candidates[i];
    } else {
      let max = 0;
      for (const candidate of candidates) {
        const reward = this._maze[candidate.row][candidate.col] == 3 ? this._reward : 0;
        if (this._qValues[candidate.row][candidate.col] + reward >= max) {
          max = this._qValues[candidate.row][candidate.col] + reward;
          next = candidate;
        }
      }
    }
    return next;
  }

  _getSelectableMoves(pos) {
    const moves = [];
    const maze = this._maze;

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

  _updateQValue(pos, next) {
    let currQ = this._qValues[pos.row][pos.col],
        nextQ = this._qValues[next.row][next.col],
        reward = this._maze[next.row][next.col] == 3 ? this._reward : 0;

    return currQ + this._alpha * (reward + this._gamma * nextQ - currQ);
  }
}

module.exports = QLearning;
