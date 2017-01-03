const random = require('../lib/random');

class ConvolutionalLayer {
  constructor(filterSize) {
    this.filter = [];
    for (let i = 0; i < filterSize; i++) {
      let ary = [];
      this.filter.push(ary);
      for (let j = 0; j < filterSize; j++) {
        ary.push(random.get(-1, 1, false));
      }
    }
  }

  conv(image) {
    let convOut = [],
        row,
        filterSize = this.filter.length;

    for (let i = 0; i < image.length - (filterSize - 1); i++) {
      convOut.push(row = []);
      for (let j = 0; j < image.length - (filterSize - 1); j++) {
        row.push(this._sum(image, this.filter, i, j));
      }
    }
    return convOut;
  }

  _sum(e, filter, i, j) {
    let sum = 0;

    for (let m = 0; m < filter.length; m++) {
      for (let n = 0; n < filter[m].length; n++) {
        sum += e[i + m][j + n] * filter[m][n];
      }
    }
    return sum;
  }
}

module.exports = ConvolutionalLayer;
