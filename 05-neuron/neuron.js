class Neuron {
  constructor(w, v, f) {
    this.w = w;
    this.v = v;
    this.f = f;
    this.o = null;
  }

  forward(input) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * this.w[i];
    }
    this.o = this.f(sum - this.v);
    return this.o;
  }

  getO() {
    return this.o;
  }

  getW(i) {
    return this.w[i];
  }

  getV() {
    return this.v;
  }

  setW(i, value) {
    this.w[i] = value;
  }

  setV(value) {
    this.v = value;
  }
}

module.exports = Neuron;
