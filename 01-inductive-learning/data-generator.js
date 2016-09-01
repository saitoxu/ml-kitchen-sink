'use strict';

let i, j, array;

for (i = 0; i < 100; i++) {
    array = [];
    for (j = 0; j < 10; j++) {
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
