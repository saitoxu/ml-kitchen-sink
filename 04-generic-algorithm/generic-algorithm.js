const random = require('../lib/random');

class GenericAlgorithm {
  constructor(data, last, rate, limit, poolSize) {
    this._parcels = this._initParcels(data);
    this._n = this._parcels.length;
    this._last = last;
    this._rate = rate;
    this._limit = limit;
    this._poolSize = poolSize;
    this._pool = this._initPool(this._n, this._poolSize);
    this._newGenPool = this._initNewGen(this._n, this._poolSize);
  }

  fit() {
    for (let generation = 0; generation < this._last; generation++) {
      this._mating(this._pool, this._newGenPool, this._n);
      this._mutation(this._newGenPool, this._n);
      this._selectNewGen(this._newGenPool, this._n);
    }
  }

  result() {
    let result = {};
    result.maxValue = 0;
    for (const pool of this._pool) {
      let parcels = [];
      let weight = 0;
      let value = 0;
      for (let i = 0; i < pool.length; i++) {
        if (pool[i]) {
          parcels.push(this._parcels[i]);
          weight += this._parcels[i].weight;
          value += this._parcels[i].value;
        }
      }
      if (weight > this._limit)
        value = 0;
      if (value > result.maxValue) {
        result.maxValue = value;
        result.totalWeight = weight;
        result.parcels = parcels;
      }
    }
    return result;
  }

  _mating(pool, newGenPool, n) {
    let mother,
        father,
        totalFitness = 0,
        roulette = [];

    for (let i = 0; i < this._poolSize; i++) {
      roulette[i] = this._evalFit(pool[i]);
      totalFitness += roulette[i];
    }

    for (let i = 0; i < this._poolSize; i++) {
      do {
        mother = this._selectPool(roulette, totalFitness);
        father = this._selectPool(roulette, totalFitness);
      } while (mother == father);

      this._crossing(pool[mother], pool[father], newGenPool[i * 2], newGenPool[i * 2 + 1], n);
    }
  }

  _evalFit(generation) {
    let value = 0, weight = 0;

    for (let pos = 0; pos < this._n; pos++) {
      weight += this._parcels[pos].weight * generation[pos];
      value += this._parcels[pos].value * generation[pos];
    }
    if (weight >= this._limit)
      value = 0;

    return value;
  }

  _selectPool(roulette, totalFitness) {
    const ball = random.get(0, totalFitness, false);
    let i = 0, acc = 0;

    for (i = 0; i < this._poolSize; i++) {
      acc += roulette[i];
      if (acc > ball) break;
    }
    return i;
  }

  _crossing(mother, father, chrom1, chrom2, n) {
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

  _mutation(newGenPool, n) {
    for (let i = 0; i < this._poolSize * 2; i++) {
      for (let j = 0; j < n; j++) {
        if (random.get() <= this._rate)
          this._newGenPool[i][j] = 1 - newGenPool[i][j];
      }
    }
  }

  _selectNewGen(newGenPool, n) {
    let ball,
        totalFitness,
        roulette = [],
        acc = 0;

    for (let i = 0; i < this._poolSize; i++) {
      totalFitness = 0;
      for (let c = 0; c < this._poolSize * 2; c++) {
        roulette[c] = this._evalFit(newGenPool[c]);
        totalFitness += roulette[c];
      }
      ball = random.get(0, totalFitness, false);
      acc = 0;
      for (let c = 0; c < this._poolSize * 2; c++) {
        acc += roulette[c];
        if (acc > ball) break;
      }

      for (let j = 0; j < n; j++) {
        this._pool[i][j] = newGenPool[i][j];
      }
    }
  }

  _initNewGen(n, poolSize) {
    let newGen = [],
        size = poolSize * 2,
        ary;

    for (let i = 0; i < size; i++) {
      newGen.push(ary = []);
      for (let j = 0; j < n; j++) {
        ary.push(0);
      }
    }
    return newGen;
  }

  _initPool(n, poolSize) {
    const pool = []
    let chrom;

    for (let i = 0; i < this._poolSize; i++) {
      pool.push(chrom = []);
      for (let j = 0; j < n; j++) {
        chrom.push(random.get(0, 1, true));
      }
    }
    return pool;
  }

  _initParcels(data) {
    const lines = data.split('\n');
    const parcels = [];
    let parcelData;

    for (let i = 0; i < lines.length - 1; i++) {
      parcelData = lines[i].split(' ');
      parcels.push({
        weight: parseInt(parcelData[0]),
        value: parseInt(parcelData[1])
      });
    }
    return parcels;
  }
}

module.exports = GenericAlgorithm;
