class PoolingLayer {
  constructor(poolSize) {
    this.size = poolSize;
  }

  pool(image) {
    let poolOut = [], row;

    for (let i = 0; i < this.size; i++) {
      poolOut.push(row = []);
      for (let j = 0; j < this.size; j++) {
        row.push(this._max(image, i, j));
      }
    }
    return poolOut;
  }

  // TODO fix
  _max(image, i, j) {
    let poolingSize = Math.ceil(image.length / this.size),
        max;

    for (let m = 0; m < poolingSize; m++) {
      for (let n = 0; n < poolingSize; n++) {
        if (!max || max < image[i * 3 + m][j * 3 + n]) {
          max = image[i * 3 + m][j * 3 + n];
        }
      }
    }
    return max;
  }
}

module.exports = PoolingLayer;
