'use strict';

let fs = require('fs'),
    random = require('../lib/random.js');

const POOLSIZE = 10;
const LAST = 50;
const MRATE = 0.01;

fs.readFile('data.txt', (err, data) => {
    let parcels = initParcels(data),
        n = parcels.length,
        weightLimit = 1000,
        pool = initPool(n),
        newGenPool = initNewGen(n),
        generation;

    for (generation = 0; generation < LAST; generation++) {
        console.log('%d generation', generation);
        selectNewGen(newGenPool);
    }

    function selectNewGen(newGenPool) {
        let i, j, c, ball,
            totalFitness,
            roulette = [],
            acc = 0;

        for (i = 0; i < POOLSIZE; i++) {
            totalFitness = 0;
            for (c = 0; c < POOLSIZE * 2; c++) {
                roulette[c] = evalFit(newGenPool[c]);
            }
        }
    }

    function evalFit(generation) {
        let pos, value = 0, weight = 0;

        for (pos = 0; pos < n; pos++) {
            weight += parcels[pos].weight * generation[pos];
            value += parcels[pos].value * generation[pos];
        }
        if (weight >= weightLimit)
            value = 0;
        return value;
    }

    function initNewGen(n) {
        let newGen = [],
            size = POOLSIZE * 2,
            ary, i, j;

        for (i = 0; i < size; i++) {
            newGen.push(ary = []);
            for (j = 0; j < n; j++) {
                ary.push(0);
            }
        }
        return newGen;
    }

    function initPool(n) {
        let pool = [], chrom, i, j;

        for (i = 0; i < POOLSIZE; i++) {
            pool.push(chrom = []);
            for (j = 0; j < n; j++) {
                chrom.push(random.get(0, 1, true));
            }
        }
        return pool;
    }

    function initParcels(data) {
        let lines = data.toString().split('\n'),
            parcels = [], parcelData, i;

        for (i = 0; i < lines.length - 1; i++) {
            parcelData = lines[i].split(' ');
            parcels.push({
                weight: parseInt(parcelData[0]),
                value: parseInt(parcelData[1])
            });
        }
        return parcels;
    }
});
