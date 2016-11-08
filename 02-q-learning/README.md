Q Learning
---
Q Learning is one of reinforcement learning in machine learning field.

[Q-Learning](https://en.wikipedia.org/wiki/Q-learning)

## Description
This program aims at solving a shortest path problem (maze).

Maze is defined as two dimensional array according to the following table.

|Meaning|Number|Remark|
|:--|--:|:--|
|Wall|0|Agent can't pass through this. Walls have to cover the outer of maze.|
|Path|1|-|
|Start|2|One start is required.|
|Goal|3|Like start, one goal is also required.|

For example, the following maze is acceptable.

```js
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
```

## Usage
Usage is as below.

1. Create a `QLearning` instance, and give an array of maze to it.
2. Solve the maze by `learn()`.
3. Display the learning result by `print()`. Shortest way is displayed as '4'.

Please check [example.js](https://github.com/saitoxu/ml-kitchen-sink/blob/master/02-q-learning/example.js) for entire code.

```js
const ALPHA = 0.1;
const GAMMA = 0.9;
const EPSILON = 0.3;
const MAX = 1000;
const REWARD = 1000;
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
const ql = new QLearning(maze, ALPHA, GAMMA, EPSILON, MAX, REWARD);
ql.learn();
ql.print();
// e.g.
// 0 4 0 0 0 0 0 0 0 0
// 0 4 1 1 1 0 1 1 1 0
// 0 4 0 0 1 1 1 0 1 0
// 0 4 0 1 1 0 0 1 1 0
// 0 4 0 1 0 0 1 0 1 0
// 0 4 4 4 1 0 4 4 4 0
// 0 1 0 4 4 4 4 0 4 3
// 0 0 0 0 0 0 0 0 0 0
```
