'use strict';

const GEN_MAX = 1000;
const NODE_NO = 15;
const ALPHA = 0.1;
const GAMMA = 0.9;
const EPSILON = 0.3;
const REWARD = 1000;

let i, s, t, qValues = [];

// initialize Q values
for (i = 0; i < NODE_NO; i++) {
    qValues.push(getRandom(0, 100, true));
}
console.log(qValues);

// Q learning
for (i = 0; i < GEN_MAX; i++) {
    s = 0;
    for (t = 0; t < 3; t++) {
        s = selectAction(s, qValues);
        qValues[s] = updateValue(s, qValues);
    }
    console.log(qValues);
}

function selectAction(old, qValues) {
    let s = 2 * old + 1;

    // epsilon-greedy method
    if (getRandom() < EPSILON) {
        if (getRandom(0, 1, true) == 1) {
            s = 2 * old + 2;
        }
    } else {
        if (qValues[2 * old + 1] <= qValues[2 * old + 2]) {
            s = 2 * old + 2;
        }
    }
    return s;
}

function updateValue(s, qValues) {
    let updated = qValues[s],
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
    return updated;
}

function getRandom(minimum, maximum, integer) {
    let min = minimum || 0,
        max = maximum || 1,
        int = integer || false,
        value;

    if (int)
        value = Math.floor(Math.random() * (max - min)) + min;
    else
        value = Math.random() * (max - min) + min;

    return value;
}
