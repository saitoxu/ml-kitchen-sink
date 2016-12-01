const fs = require('fs');
const random = require('../lib/random');
const Neuron = require('../05-neuron/neuron');

const ALPHA =   10;
const LIMIT = 0.01;
const IN    =    3;
const MID   =    3;

fs.readFile('data.txt', (err, data) => {
    let e = initInput(data),
        error = 100,
        mid = [],
        out, i, j, w, v, output, teacher;

    { // init
        for (i = 0; i < MID; i++) {
            w = [], v = random.get(-1, 1, false);
            for (j = 0; j < IN; j++) {
                w.push(random.get(-1, 1, false));
            }
            mid.push(new Neuron(w, v, sigmoid));
        }

        w = [], v = random.get(-1, 1, false);
        for (i = 0; i < MID; i++) {
            w.push(random.get(-1, 1, false));
        }
        out = new Neuron(w, v, sigmoid);
    }

    while (error > LIMIT) {
        error = 0.0;
        for (i = 0; i < e.length; i++) {
            teacher = e[i][IN];
            output = forward(e[i].slice(0, IN), mid, out);
            oLearn(teacher, output, mid, out);
            hLearn(teacher, output, mid, out, e[i].slice(0, IN));
            error += (teacher - output) * (teacher - output);
        }
        // console.log(error);
    }

    for (i = 0; i < e.length; i++) {
        console.log(e[i], forward(e[i].slice(0, IN), mid, out));
    }

    function hLearn(teacher, output, mid, out, e) {
        let i, j, d;

        for (i = 0; i < mid.length; i++) {
            d = mid[i].getO() * (1 - mid[i].getO()) * out.getW(i) * (teacher - output) * output * (1 - output);
            for (j = 0; j < IN; j++) {
                mid[i].setW(j, mid[i].getW(j) + ALPHA * e[j] * d);
            }
            mid[i].setV(mid[i].getV() + ALPHA * (-1.0) * d);
        }
    }

    function oLearn(teacher, output, mid, out) {
        let i, d;
        d = (teacher - output) * output * (1 - output);
        for (i = 0; i < mid.length; i++) {
            out.setW(i, out.getW(i) + ALPHA * mid[i].getO() * d);
        }
        out.setV(out.getV() + ALPHA * (-1.0) * d);
    }

    function forward(e, mid, out) {
        let eo = [];
        mid.forEach(m => {
            eo.push(m.forward(e));
        });
        return out.forward(eo);
    }

    function sigmoid(u) {
        let value = 1.0 / (1.0 + Math.exp(-u));
        return value;
    }

    function initInput(data) {
        let lines = data.toString().split('\n'),
            inputs = [], input, tmp, i;

        for (i = 0; i < lines.length - 1; i++) {
            tmp = lines[i].split(' ');
            input = [];
            tmp.forEach(i => {
                input.push(parseInt(i));
            });
            inputs.push(input);
        }
        return inputs;
    }
});
