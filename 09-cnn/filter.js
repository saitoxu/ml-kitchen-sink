'use strict';

let random = require('../lib/random.js');

class Filter {
    constructor(filterSize, inputSize) {
        let i, j, ary;
        this.filter = [];
        this.filterSize = filterSize;
        this.inputSize = inputSize;
        for (i = 0; i < this.filterSize; i++) {
            this.filter.push(ary = []);
            for (j = 0; j < this.filterSize; j++) {
                ary.push(random.get(-1, 1, false));
            }
        }
    }

    get() {
        return this.filter;
    }

    conv(image) {
        let i, j, row,
            convOut = [];
        for (i = 0; i < this.inputSize - (this.filterSize - 1); i++) {
            convOut.push(row = []);
            for (j = 0; j < this.inputSize - (this.filterSize - 1); j++) {
                row.push(this.calcConv(image, i, j));
            }
        }
        return convOut;
    }

    calcConv(image, i, j) {
        let m, n, sum = 0;
        for (m = 0; m < this.filterSize; m++) {
            for (n = 0; n < this.filterSize; n++) {
                sum += image[i + m][j + n] * this.filter[m][n];
            }
        }
        return sum;
    }
}

module.exports = Filter;
