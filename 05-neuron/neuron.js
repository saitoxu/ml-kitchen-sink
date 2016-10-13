/**
 * Neuron
 *
 * And operator
 */
'use strict';

const fs = require('fs');
const Neuron = require('../lib/neuron.js');

fs.readFile('data.txt', (err, data) => {
  const input = initInput(data);
  const w = [ 1, 1 ];
  const v = 1.5;
  const neuron = new Neuron(w, v, f);

  for (let i = 0; i < input.length; i++) {
    console.log(input[i], neuron.forward(input[i]));
  }

  /**
   * Transfer function
   *
   * @param  {Number} u
   * @return {Number}
   */
  function f(u) {
    return u >= 0 ? 1 : 0;
  }

  function initInput(data) {
    const lines = data.toString().split('\n');
    let input = [];

    for (let i = 0; i < lines.length - 1; i++) {
      const inputs = lines[i].split(' ');
      input.push([ parseInt(inputs[0]), parseInt(inputs[1]) ]);
    }
    return input;
  }
});
