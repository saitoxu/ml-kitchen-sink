class ConvolutionLayer {
  constructor(e, filter) {
    this.e = e;
    this.filter = filter;
  }

  calc() {
    let convOut = [],
        row,
        filterSize = this.filter.length;

    for (let i = 0; i < this.e.length - (filterSize - 1); i++) {
      convOut.push(row = []);
      for (let j = 0; j < this.e[i].length - (filterSize - 1); j++) {
        row.push(this._sum(this.e, this.filter, i, j));
      }
    }
    this.layer = convOut;
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

module.exports = ConvolutionLayer;
