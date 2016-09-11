'use strict';

let fs = require('fs'),
    random = require('../lib/random.js'),
    test1 = { file: 'data.txt',  limit: 1000, pool: 10 },
    test2 = { file: 'data2.txt', limit:  300, pool: 50 },
    test = test1; // to change test data

const POOLSIZE = test.pool;
const LAST = 50;
const MRATE = 0.01;

fs.readFile(test.file, (err, data) => {
    let parcels = initParcels(data),
        n = parcels.length,
        weightLimit = test.limit,
        pool = initPool(n),
        newGenPool = initNewGen(n),
        generation;

    for (generation = 0; generation < LAST; generation++) {
        console.log('%d generation', (generation + 1));
        mating(pool, newGenPool, n);
        mutation(newGenPool, n);
        selectNewGen(newGenPool, n);
        printPool(pool);
    }

    function printPool(pool) {
        let i,
            j,
            fitness,
            totalFitness = 0,
            elite,
            bestFit = 0,
            str;

        for (i = 0; i < POOLSIZE; i++) {
            str = '';
            for (j = 0; j < n; j++)
                str += pool[i][j];
            fitness = evalFit(pool[i]);
            console.log(str + '\t' + fitness);
            if (fitness > bestFit) {
                bestFit = fitness;
                elite = i;
            }
            totalFitness += fitness;
        }
        str = '' + elite + '\t' + bestFit + ' \t';
        console.log(str + (totalFitness / POOLSIZE) + '\n');
        // console.log(totalFitness / POOLSIZE);
     }

    function mutation(newGenPool, n) {
        let i, j;

        for (i = 0; i < POOLSIZE * 2; i++) {
            for (j = 0; j < n; j++) {
                if (random.get() <= MRATE)
                    newGenPool[i][j] = 1 - newGenPool[i][j];
            }
        }
    }

    function crossing(mother, father, chrom1, chrom2, n) {
        let j, cp;

        cp = random.get(0, n, false);

        for (j = 0; j < cp; j++) {
            chrom1[j] = mother[j];
            chrom2[j] = father[j];
        }
        for (; j < n; j++) {
            chrom2[j] = mother[j];
            chrom1[j] = father[j];
        }
    }

    function selectPool(roulette, totalFitness) {
        let i, ball, acc = 0;

        ball = random.get(0, totalFitness, false);
        for (i = 0; i < POOLSIZE; i++) {
            acc += roulette[i];
            if (acc > ball) break;
        }
        return i;
    }

    function mating(pool, newGenPool, n) {
        let i,
            mother,
            father,
            totalFitness = 0,
            roulette = [];

        for (i = 0; i < POOLSIZE; i++) {
            roulette[i] = evalFit(pool[i]);
            totalFitness += roulette[i];
        }

        for (i = 0; i < POOLSIZE; i++) {
            do {
                mother = selectPool(roulette, totalFitness);
                father = selectPool(roulette, totalFitness);
            } while (mother == father);

            crossing(pool[mother], pool[father], newGenPool[i * 2], newGenPool[i * 2 + 1], n);
        }
    }

    function selectNewGen(newGenPool, n) {
        let i, j, c, ball,
            totalFitness,
            roulette = [],
            acc = 0;

        for (i = 0; i < POOLSIZE; i++) {
            totalFitness = 0;
            for (c = 0; c < POOLSIZE * 2; c++) {
                roulette[c] = evalFit(newGenPool[c]);
                totalFitness += roulette[c];
            }
            ball = random.get(0, totalFitness, false);
            acc = 0;
            for (c = 0; c < POOLSIZE * 2; c++) {
                acc += roulette[c];
                if (acc > ball) break;
            }

            for (j = 0; j < n; j++) {
                pool[i][j] = newGenPool[i][j];
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
