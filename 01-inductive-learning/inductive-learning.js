'use strict';

let fs = require('fs');
const LEARNING_COUNT = 10000;

fs.readFile('learning.txt', (err, data) => {
    let teachers = readData(data),
        size = teachers[0].length - 1,
        bestScore = 0,
        result, score, candidate, i;

    for (i = 0; i < LEARNING_COUNT; i++) {
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

    fs.readFile('test.txt', (err, data) => {
        let testData = readData(data),
            score = calcScore(result, testData);

        console.log('Correct rate: ' + score + ' / ' + testData.length);
    });
});

function calcScore(candidate, teachers) {
    let score = 0,
        dataSize = candidate.length,
        maxPoint = dataSize,
        resultDataIdx = dataSize,
        point,
        teacher,
        i, j;

    for (i = 0; i < teachers.length; i++) {
        point = 0, teacher = teachers[i];

        for (j = 0; j < dataSize; j++) {
            if (candidate[j] == 2 ||
                candidate[j] == teacher[j]) {
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

function readData(data) {
    let lines = data.toString().split('\n'),
        dataAry = [], i;

    for (i = 0; i < lines.length - 1; i++) {
        dataAry.push(lines[i].split(' ').map(value => {
            return parseInt(value);
        }));
    }
    return dataAry;
}

function makeCandidate(size) {
    let candidate = [], i;

    for (i = 0; i < size; i++) {
        candidate.push(Math.floor(Math.random() * 3));
    }
    return candidate;
}
