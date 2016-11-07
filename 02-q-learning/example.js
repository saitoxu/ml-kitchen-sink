const QLearning = require('./q-learning');
const ALPHA = 0.1;
const GAMMA = 0.9;
const EPSILON = 0.3;
const MAX = 1000;
const REWARD = 1000;
const maze = [ // 0: wall, 1: path, 2: start, 3: goal
  [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1, 1, 1, 0 ],
  [ 0, 1, 0, 0, 1, 1, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 1, 0, 0, 1, 1, 0 ],
  [ 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ],
  [ 0, 1, 1, 1, 1, 0, 1, 1, 1, 0 ],
  [ 0, 1, 0, 1, 1, 1, 1, 0, 1, 3 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];
const ql = new QLearning(maze, ALPHA, GAMMA, EPSILON, MAX, REWARD);
ql.learn();
ql.print();
