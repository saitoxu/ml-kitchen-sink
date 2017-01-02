const random = require('../lib/random');

class Filter {
  constructor(filterSize, inputSize) {
    this.filter = [];
    this.filterSize = filterSize;
    this.inputSize = inputSize;

    for (let i = 0; i < this.filterSize; i++) {
      let ary = [];
      this.filter.push(ary);
      for (let j = 0; j < this.filterSize; j++) {
        ary.push(random.get(-1, 1, false));
      }
    }
  }

  get() {
    return this.filter;
  }

  conv(image) {
    let row, convOut = [];
    for (let i = 0; i < this.inputSize - (this.filterSize - 1); i++) {
      convOut.push(row = []);
      for (let j = 0; j < this.inputSize - (this.filterSize - 1); j++) {
        row.push(this.calcConv(image, i, j));
      }
    }
    return convOut;
  }

  calcConv(image, i, j) {
    let sum = 0;
    for (let m = 0; m < this.filterSize; m++) {
      for (let n = 0; n < this.filterSize; n++) {
        sum += image[i + m][j + n] * this.filter[m][n];
      }
    }
    return sum;
  }
}

module.exports = Filter;
