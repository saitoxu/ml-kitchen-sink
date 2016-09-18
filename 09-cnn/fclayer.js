'use strict';

let random = require('../lib/random.js');

class FCLayer { // fully connected layer
    constructor(f, hiddenNo, poolOutSize, filterNo, alpha) {
        let i, j, ary;
        this.interLayer = [];
        this.outputLayer = [];
        this.f = f;
        this.hiddenNo = hiddenNo;
        this.poolOutSize = poolOutSize;
        this.filterNo = filterNo;
        this.alpha = alpha;
        this.o = null;
        for (i = 0; i < this.hiddenNo; i++) {
            this.interLayer.push(ary = []);
            for (j = 0; j < this.poolOutSize * this.poolOutSize * this.filterNo + 1; j++) {
                ary.push(random.get(-1, 1, false));
            }
        }
        for (i = 0; i < this.hiddenNo + 1; i++) {
            this.outputLayer.push(random.get(-1, 1, false));
        }
    }

    getInterLayer() {
        return this.interLayer;
    }

    getOutputLayer() {
        return this.outputLayer;
    }

    forward(e) {
        let i, j, u, o, hi = [];
        for (i = 0; i < this.hiddenNo; i++) {
            u = 0;
            for (j = 0; j < this.poolOutSize * this.poolOutSize * this.filterNo; j++) {
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
        return this.o = this.f(o);
    }

    learnOutputLayer(e) {
        let i, d;
        d = (e[this.poolOutSize * this.poolOutSize * this.filterNo] - this.o) * this.o * (1 - this.o);
        for (i = 0; i < this.hiddenNo; i++) {
            this.outputLayer[i] += this.alpha * this.hi[i] * d;
        }
        this.outputLayer[i] += this.alpha * (-1.0) * d;
    }

    learnInterLayer(e) {
        let i, j, dj;
        for (j = 0; j < this.hiddenNo; j++) {
            dj = this.hi[j] * (1 - this.hi[j]) * this.outputLayer[j] *
                    (e[this.poolOutSize * this.poolOutSize * this.filterNo] - this.o) * this.o * (1 - this.o);
            for (i = 0; i < this.poolOutSize * this.poolOutSize * this.filterNo; i++) {
                this.interLayer[j][i] += this.alpha * e[i] * dj;
            }
            this.interLayer[j][i] += this.alpha * (-1.0) * dj;
        }
    }
}

module.exports = FCLayer;
