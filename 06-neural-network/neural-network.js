'use strict';

let fs = require('fs');

fs.readFile('data.txt', (err, data) => {
    let x = initInput(data),
        w1 = [ -2, 3 ], w2 = [ -2, 1 ], w3 = [ -60, 94 ],
        v1 = -1, v2 = 0.5, v3 = -1,
        i;

    let neuron1 = new Neuron(w1, v1, f),
        neuron2 = new Neuron(w2, v2, f),
        neuron3 = new Neuron(w3, v3, f);

    for (i = 0; i < x.length; i++) {
        let z1 = neuron1.forward([x[i][0], x[i][1]]);
        let z2 = neuron2.forward([x[i][0], x[i][1]]);
        console.log(x[i], neuron3.forward([z1, z2]));
    }

    function f(u) {
        return u >= 0 ? 1 : 0;
    }

    function initInput(data) {
        let lines = data.toString().split('\n'),
            input = [], inputs, i;

        for (i = 0; i < lines.length - 1; i++) {
            inputs = lines[i].split(' ');
            input.push([ parseInt(inputs[0]), parseInt(inputs[1]) ]);
        }
        return input;
    }
});

class Neuron {
    constructor(w, v, f) {
        this.w = w;
        this.v = v;
        this.f = f;
    }

    forward(input) {
        let i, sum = 0;
        for (i = 0; i < input.length; i++) {
            sum += input[i] * this.w[i];
        }
        return this.f(sum - this.v);
    }
}
