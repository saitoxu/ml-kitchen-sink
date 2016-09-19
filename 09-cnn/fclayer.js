'use strict';

let random = require('../lib/random.js');

class FCLayer { // fully connected layer
  constructor(f, hiddenNo, max, alpha, outputNo) {
    let i, j, ary;
    this.interLayer = [];
    this.outputLayer = [];
    this.f = f;
    this.hiddenNo = hiddenNo;
    this.max = max;
    this.alpha = alpha;
    this.outputNo = outputNo;
    for (i = 0; i < this.hiddenNo; i++) {
      this.interLayer.push(ary = []);
      for (j = 0; j < this.max + 1; j++) {
        ary.push(random.get(-1, 1, false));
      }
    }
    for (i = 0; i < this.outputNo; i++) {
      let weight = [];
      for (j = 0; j < this.hiddenNo + 1; j++) {
        weight.push(random.get(-1, 1, false));
      }
      this.outputLayer.push(weight);
    }
  }

  getInterLayer() {
    return this.interLayer;
  }

  getOutputLayer() {
    return this.outputLayer;
  }

  forward(e) {
    let i, j, u, o = [], innerO, hi = [], innerHi;
    for (let k = 0; k < this.outputNo; k++) {
      innerHi = [];
      for (i = 0; i < this.hiddenNo; i++) {
        u = 0;
        for (j = 0; j < this.max; j++) {
          u += e[j] * this.interLayer[i][j];
        }
        u -= this.interLayer[i][j]; // last value is threshold of intermediate layer
        innerHi[i] = this.f(u); // output value of intermediate layer
      }
      innerO = 0;
      for (i = 0; i < this.hiddenNo; i++) {
        innerO += innerHi[i] * this.outputLayer[k][i];
      }
      hi.push(innerHi);
      innerO -= this.outputLayer[k][i]; // last value is threshold of output layer
      o.push(this.f(innerO));
    }
    this.hi = hi;
    return this.o = o;

    /* for (i = 0; i < this.hiddenNo; i++) {
        u = 0;
        for (j = 0; j < this.max; j++) {
            u += e[j] * this.interLayer[i][j];
        }
        u -= this.interLayer[i][j]; // last value is threshold of intermediate layer
        hi[i] = this.f(u); // output value of intermediate layer
    }
    this.hi = hi; // output of intermediate layer

    o = 0;
    for (i = 0; i < this.hiddenNo; i++) {
        o += hi[i] * this.outputLayer[i];
    }
    o -= this.outputLayer[i]; // last value is threshold of output layer
    return this.o = this.f(o); */
  }

  learnOutputLayer(e) {
    let i, d;
    for (let k = 0; k < this.outputNo; k++) {
      d = (e[this.max] - this.o[k]) * this.o[k] * (1 - this.o[k]);
      for (i = 0; i < this.hiddenNo; i++) {
        this.outputLayer[k][i] += this.alpha * this.hi[k][i] * d;
      }
      this.outputLayer[k][i] += this.alpha * (-1.0) * d;
    }

    /* let i, d;
    d = (e[this.max] - this.o) * this.o * (1 - this.o);
    for (i = 0; i < this.hiddenNo; i++) {
        this.outputLayer[i] += this.alpha * this.hi[i] * d;
    }
    this.outputLayer[i] += this.alpha * (-1.0) * d; */
  }

  learnInterLayer(e) {
    let i, j;
    for (let k = 0; k < this.outputNo; k++) {
      for (j = 0; j < this.hiddenNo; j++) {
        let dj = this.hi[k][j] * (1 - this.hi[k][j]) * this.outputLayer[k][j] *
            (e[this.max] - this.o[k]) * this.o[k] * (1 - this.o[k]);
        for (i = 0; i < this.max; i++) {
          this.interLayer[j][i] += this.alpha * e[i] * dj;
        }
        this.interLayer[j][i] += this.alpha * (-1.0) * dj;
      }
    }

    /* let i, j, dj;
    for (j = 0; j < this.hiddenNo; j++) {
        dj = this.hi[j] * (1 - this.hi[j]) * this.outputLayer[j] *
                (e[this.max] - this.o) * this.o * (1 - this.o);
        for (i = 0; i < this.max; i++) {
            this.interLayer[j][i] += this.alpha * e[i] * dj;
        }
        this.interLayer[j][i] += this.alpha * (-1.0) * dj;
    } */
  }
}

module.exports = FCLayer;
