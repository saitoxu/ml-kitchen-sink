const AntColony = require('./ant-colony');
const NOA = 10;
const LIMIT = 100;
const Q = 3;
const RHO = 0.8;
const EPSILON = 0.15;
const distance = [
  //  s    a    b    c    d
  [ 0.0, 4.0, 4.0, 4.7, 5.0 ], // start
  [ 0.0, 0.0, 1.2, 2.5, 1.7 ], // a
  [ 0.0, 1.2, 0.0, 1.0, 1.4 ], // b
  [ 0.0, 2.5, 1.0, 0.0, 2.0 ], // c
  [ 0.0, 1.7, 1.4, 2.0, 0.0 ]  // d
];
const ac = new AntColony(NOA, LIMIT, Q, RHO, EPSILON, distance);

ac.solve();
console.log(ac.result());
