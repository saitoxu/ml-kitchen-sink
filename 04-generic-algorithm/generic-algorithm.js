/**
 * Generic Algorithm
 *
 * Knapsack problem
 */
'use strict';

const fs = require('fs');
const random = require('../lib/random.js');
const test1 = { file: 'data.txt',  limit: 1000, pool: 10 };
const test2 = { file: 'data2.txt', limit:  300, pool: 50 };
const test = test1; // You can change test data
const POOLSIZE = test.pool;
const LAST = 50;
const MRATE = 0.01;

fs.readFile(test.file, (err, data) => {
  let parcels = initParcels(data),
      n = parcels.length,
      weightLimit = test.limit,
      pool = initPool(n),
      newGenPool = initNewGen(n);

  for (let generation = 0; generation < LAST; generation++) {
    console.log('%d generation', (generation + 1));
    mating(pool, newGenPool, n);
    mutation(newGenPool, n);
    selectNewGen(newGenPool, n);
    printPool(pool);
  }

  function printPool(pool) {
    let fitness,
        totalFitness = 0,
        elite,
        bestFit = 0,
        str;

    for (let i = 0; i < POOLSIZE; i++) {
      str = '';
      for (let j = 0; j < n; j++)
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
  }

  function mutation(newGenPool, n) {
    for (let i = 0; i < POOLSIZE * 2; i++) {
      for (let j = 0; j < n; j++) {
        if (random.get() <= MRATE)
          newGenPool[i][j] = 1 - newGenPool[i][j];
      }
    }
  }

  function crossing(mother, father, chrom1, chrom2, n) {
    const cp = random.get(0, n, false);
    let j = 0;

    for (; j < cp; j++) {
      chrom1[j] = mother[j];
      chrom2[j] = father[j];
    }
    for (; j < n; j++) {
      chrom2[j] = mother[j];
      chrom1[j] = father[j];
    }
  }

  function selectPool(roulette, totalFitness) {
    const ball = random.get(0, totalFitness, false);
    let i = 0, acc = 0;

    for (i = 0; i < POOLSIZE; i++) {
      acc += roulette[i];
      if (acc > ball) break;
    }
    return i;
  }

  function mating(pool, newGenPool, n) {
    let mother,
        father,
        totalFitness = 0,
        roulette = [];

    for (let i = 0; i < POOLSIZE; i++) {
      roulette[i] = evalFit(pool[i]);
      totalFitness += roulette[i];
    }

    for (let i = 0; i < POOLSIZE; i++) {
      do {
        mother = selectPool(roulette, totalFitness);
        father = selectPool(roulette, totalFitness);
      } while (mother == father);

      crossing(pool[mother], pool[father], newGenPool[i * 2], newGenPool[i * 2 + 1], n);
    }
  }

  function selectNewGen(newGenPool, n) {
    let ball,
        totalFitness,
        roulette = [],
        acc = 0;

    for (let i = 0; i < POOLSIZE; i++) {
      totalFitness = 0;
      for (let c = 0; c < POOLSIZE * 2; c++) {
        roulette[c] = evalFit(newGenPool[c]);
        totalFitness += roulette[c];
      }
      ball = random.get(0, totalFitness, false);
      acc = 0;
      for (let c = 0; c < POOLSIZE * 2; c++) {
        acc += roulette[c];
        if (acc > ball) break;
      }

      for (let j = 0; j < n; j++) {
        pool[i][j] = newGenPool[i][j];
      }
    }
  }

  function evalFit(generation) {
    let value = 0, weight = 0;

    for (let pos = 0; pos < n; pos++) {
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
        ary;

    for (let i = 0; i < size; i++) {
      newGen.push(ary = []);
      for (let j = 0; j < n; j++) {
        ary.push(0);
      }
    }
    return newGen;
  }

  function initPool(n) {
    let pool = [], chrom;

    for (let i = 0; i < POOLSIZE; i++) {
      pool.push(chrom = []);
      for (let j = 0; j < n; j++) {
        chrom.push(random.get(0, 1, true));
      }
    }
    return pool;
  }

  function initParcels(data) {
    let lines = data.toString().split('\n'),
        parcels = [], parcelData;

    for (let i = 0; i < lines.length - 1; i++) {
      parcelData = lines[i].split(' ');
      parcels.push({
        weight: parseInt(parcelData[0]),
        value: parseInt(parcelData[1])
      });
    }
    return parcels;
  }
});
