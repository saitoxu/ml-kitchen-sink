/**
 * Function to generate data which is used in inductive-learning.js.
 */
(function() {
  'use strict';

  const SIZE = 100,
        LENGTH = 10;

  for (let i = 0; i < SIZE; i++) {
    const array = [];
    for (let j = 0; j < LENGTH; j++) {
      array.push(Math.floor(Math.random() * 2));
    }

    if (array[2] == 1 && array[4] == 1) {
      array.push(1);
    } else if (array[2] == 1 || array[4] == 1) {
      array.push(Math.floor(Math.random() * 2));
    } else {
      array.push(0);
    }

    console.log(array.join(' '));
  }
}());
