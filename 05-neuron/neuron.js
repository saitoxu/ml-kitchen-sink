'use strict';

let fs = require('fs'),
    Neuron = require('../lib/neuron.js');

fs.readFile('data.txt', (err, data) => {
    let input = initInput(data),
        w = [ 1, 1 ],
        v = 1.5,
        i;

    let neuron = new Neuron(w, v, f);

    for (i = 0; i < input.length; i++) {
        console.log(input[i], neuron.forward(input[i]));
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
