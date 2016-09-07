'use strict';

let random = require('../lib/random.js');

const NOA = 10;
const ILIMIT = 50;
const Q = 3;
const RHO = 0.8;
const STEP = 10;
const EPSILON = 0.15;

let cost = [], pheromone = [], mstep = [], i;

init();

for (i = 0; i < ILIMIT; i++) {
    // console.log('Turn: ' + (i + 1));
    walk();
    update();
}

function update() {
    let m, d, i, j, sum = 0;

    for (i = 0; i < 2; i++) {
        for (j = 0; j < STEP; j++) {
            pheromone[i][j] *= RHO;
        }
    }

    for (m = 0; m < NOA; m++) {
        d = 0;
        for (i = 0; i < STEP; i++) {
            d += cost[mstep[m][i]][i];
        }

        for (i = 0; i < STEP; i++) {
            pheromone[mstep[m][i]][i] += (Q / d);
        }
        sum += d;
    }
    console.log(sum / NOA);
}

function walk() {
    let m, s;

    for (m = 0; m < NOA; m++) {
        for (s = 0; s < STEP; s++) {
            // if (pheromone[0][s] != 0 && pheromone[1][s] != 0) {
            //     let a0 = Math.pow(pheromone[0][s], 1.0) * Math.pow((1.0 / cost[0][s]), 1.0);
            //     let a1 = Math.pow(pheromone[1][s], 1.0) * Math.pow((1.0 / cost[1][s]), 1.0);
            //     if (random.get() < (a0 / a0 + a1)) {
            //         mstep[m][s] = 0;
            //     } else {
            //         mstep[m][s] = 1;
            //     }
            // } else {
            //     mstep[m][s] = random.get(0, 1, true);
            // }

            if ((random.get() < EPSILON) || (Math.abs(pheromone[0][s] - pheromone[1][s]) < 1e-9)) {
                mstep[m][s] = random.get(0, 1, true);
            } else {
                if (pheromone[0][s] > pheromone[1][s]) {
                    mstep[m][s] = 0;
                } else {
                    mstep[m][s] = 1;
                }
            }

            // if (random.get() < EPSILON || pheromone[0][s] == 0 || pheromone[1][s] == 0) {
            //     c = cost[1][s] / (cost[0][s] + cost[1][s]);
            //     if (random.get() < c) {
            //         mstep[m][s] = 0;
            //     } else {
            //         mstep[m][s] = 1;
            //     }
            // } else {
            //     t = pheromone[0][s] / (pheromone[0][s] + pheromone[1][s]);
            //     if (random.get() < t) {
            //         mstep[m][s] = 0;
            //     } else {
            //         mstep[m][s] = 1;
            //     }
            // }
        }
    }
    // console.log(mstep);
}

function init() {
    let i, j, ary;

    for (i = 0; i < 2; i++) {
        cost.push(ary = []);
        for (j = 0; j < STEP; j++) {
            if (i == 0)
                ary.push(1);
            else
                ary.push(5);
        }
    }

    for (i = 0; i < 2; i++) {
        pheromone.push(ary = []);
        for (j = 0; j < STEP; j++) {
            ary.push(0);
        }
    }

    for (i = 0; i < NOA; i++) {
        mstep.push(ary = []);
        for (j = 0; j < STEP; j++) {
            ary.push(-1);
        }
    }
}
