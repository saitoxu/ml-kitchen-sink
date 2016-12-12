const random = require('../lib/random');
const Neuron = require('../05-neuron/neuron');

class BackPropagation {

  constructor(e, alpha, limit, inNum, midNum, f) {
    this.e = e;
    this.alpha = alpha;
    this.limit = limit;
    this.in = inNum;
    this.mid = midNum;
    this.error = 100;
    this.mid = [];

    for (let i = 0; i < midNum; i++) {
      let w = [], v = random.get(-1, 1, false);
      for (let j = 0; j < inNum; j++) {
        w.push(random.get(-1, 1, false));
      }
      this.mid.push(new Neuron(w, v, f));
    }

    let w = [], v = random.get(-1, 1, false);
    for (let i = 0; i < midNum; i++) {
      w.push(random.get(-1, 1, false));
    }
    this.out = new Neuron(w, v, f);
  }

  learn() {
    while (this.error > this.limit) {
      this.error = 0.0;
      for (let i = 0; i < this.e.length; i++) {
        const teacher = this.e[i][this.in];
        const output = this.forward(this.e[i].slice(0, this.in), this.mid, this.out);
        this.oLearn(teacher, output, this.mid, this.out);
        this.hLearn(teacher, output, this.mid, this.out, this.e[i].slice(0, this.in));
        this.error += (teacher - output) * (teacher - output);
      }
    }
  }

  oLearn(teacher, output, mid, out) {
    const d = (teacher - output) * output * (1 - output);
    for (let i = 0; i < mid.length; i++) {
      out.setW(i, out.getW(i) + this.alpha * mid[i].getO() * d);
    }
    out.setV(out.getV() + this.alpha * (-1.0) * d);
  }

  hLearn(teacher, output, mid, out, e) {
    for (let i = 0; i < mid.length; i++) {
      const d = mid[i].getO() * (1 - mid[i].getO()) * out.getW(i) * (teacher - output) * output * (1 - output);
      for (let j = 0; j < this.in; j++) {
        mid[i].setW(j, mid[i].getW(j) + this.alpha * e[j] * d);
      }
      mid[i].setV(mid[i].getV() + this.alpha * (-1.0) * d);
    }
  }

  forward(e, mid, out) {
    const eo = [];
    mid.forEach(m => {
      eo.push(m.forward(e));
    });
    return out.forward(eo);
  }

  result() {
    for (let i = 0; i < this.e.length; i++) {
      console.log(this.e[i], this.forward(this.e[i].slice(0, this.in), this.mid, this.out));
    }
  }

}

module.exports = BackPropagation;
