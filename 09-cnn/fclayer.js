const random = require('../lib/random');

class FCLayer {
  constructor(f, hiddenNo, alpha, inputNo, outputNo) {
    this.f = f;
    this.hiddenNo = hiddenNo;
    this.alpha = alpha;
    this.hiddenW = [];
    this.hiddenV = [];
    this.outputW = [];
    this.outputV = [];
    this.inputNo = inputNo;
    this.outputNo = outputNo;

    for (let i = 0; i < this.hiddenNo; i++) {
      let hiddenW = [];
      for (let j = 0; j < this.inputNo; j++) {
        hiddenW.push(random.get(-1, 1, false));
      }
      this.hiddenW.push(hiddenW);
    }
    for (let i = 0; i < this.hiddenNo; i++) {
      this.hiddenV.push(random.get(-1, 1, false));
    }

    for (let i = 0; i < this.outputNo; i++) {
      let outputW = [];
      for (let j = 0; j < this.hiddenNo; j++) {
        outputW.push(random.get(-1, 1, false));
      }
      this.outputW.push(outputW);
    }
    for (let i = 0; i < this.outputNo; i++) {
      this.outputV.push(random.get(-1, 1, false));
    }
  }

  forward(input) {
    let hiddenO = [];
    for (let h = 0; h < this.hiddenNo; h++) {
      let u = 0;
      for (let i = 0; i < this.inputNo; i++) {
        u += input.getImage()[i] * this.hiddenW[h][i];
      }
      u -= this.hiddenV[h];
      hiddenO[h] = this.f(u);
    }
    this.hiddenO = hiddenO;

    let outputO = [];
    for (let o = 0; o < this.outputNo; o++) {
      let u = 0;
      for (let h = 0; h < this.hiddenNo; h++) {
        u += this.hiddenO[h] * this.outputW[o][h];
      }
      u -= this.outputV[o];
      outputO[o] = this.f(u);
    }
    return this.outputO = outputO;
  }

  learnOutputLayer(input) {
    for (let o = 0; o < this.outputNo; o++) {
      let d = (input.getTeacher()[o] - this.outputO[o]) * this.outputO[o] * (1 - this.outputO[o]);
      for (let h = 0; h < this.hiddenNo; h++) {
        this.outputW[o][h] += this.alpha * this.hiddenO[h] * d;
      }
      this.outputV[o] += this.alpha * (-1.0) * d;
    }
  }

  learnHiddenLayer(input) {
    for (let h = 0; h < this.hiddenNo; h++) {
      let d = 0;
      for (let o = 0; o < this.outputNo; o++) {
        d += this.hiddenO[h] * (1 - this.hiddenO[h]) * this.outputW[o][h] *
            (input.getTeacher()[o] - this.outputO[o]) * this.outputO[o] * (1 - this.outputO[o]);
      }
      d = d / this.outputNo;
      for (let i = 0; i < this.inputNo; i++) {
        this.hiddenW[h][i] += this.alpha * input.getImage()[i] * d;
      }
      this.hiddenV[h] += this.alpha * (-1.0) * d;
    }
  }
}

module.exports = FCLayer;
