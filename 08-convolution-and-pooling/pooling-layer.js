class PoolingLayer {
  constructor(size, convLayer) {
    this.size = size;
    this.convLayer = convLayer;
  }

  calc() {
    let poolOut = [], row;

    for (let i = 0; i < this.size; i++) {
      poolOut.push(row = []);
      for (let j = 0; j < this.size; j++) {
        row.push(this._max(this.convLayer.layer, i, j));
      }
    }
    this.layer = poolOut;
  }

  _max(convOut, i, j) {
    let max = 0;

    for (let m = 0; m < this.size; m++) {
      for (let n = 0; n < this.size; n++) {
        if (max < convOut[i * this.size + m][j * this.size + n]) {
          max = convOut[i * this.size + m][j * this.size + n];
        }
      }
    }
    return max;
  }
}

module.exports = PoolingLayer;
