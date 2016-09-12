'use strict';

let fs = require('fs');

const POOLSIZE = 3;

fs.readFile('data1.txt', (err, data) => {
    let e = inputData(data.toString()),
        filter = [[ 0, 1, 0 ],
                  [ 0, 1, 0 ],
                  [ 0, 1, 0 ]],
        convOut = conv(e, filter),
        poolOut = pool(convOut);

    for (let i = 0; i < poolOut.length; i++) {
        console.log(poolOut[i]);
    }

    function pool(convOut) {
        let i, j, poolOut = [], row;

        for (i = 0; i < POOLSIZE; i++) {
            poolOut.push(row = []);
            for (j = 0; j < POOLSIZE; j++) {
                row.push(maxPooling(convOut, i, j));
            }
        }
        return poolOut;
    }

    function maxPooling(convOut, i, j) {
        let m, n, max = 0;

        for (m = 0; m < POOLSIZE; m++) {
            for (n = 0; n < POOLSIZE; n++) {
                if (max < convOut[i * POOLSIZE + m][j * POOLSIZE + n]) {
                    max = convOut[i * POOLSIZE + m][j * POOLSIZE + n];
                }
            }
        }
        return max;
    }

    function conv(e, filter) {
        let convOut = [],
            row, i, j,
            filterSize = filter.length;

        for (i = 0; i < e.length - (filterSize - 1); i++) {
            convOut.push(row = []);
            for (j = 0; j < e[i].length - (filterSize - 1); j++) {
                row.push(calcConv(e, filter, i, j));
            }
        }
        return convOut;
    }

    function calcConv(e, filter, i, j) {
        let m, n, sum = 0;

        for (m = 0; m < filter.length; m++) {
            for (n = 0; n < filter[m].length; n++) {
                sum += e[i + m][j + n] * filter[m][n];
            }
        }
        return sum;
    }

    function inputData(d) {
        let e = [], i,
            lines = d.split('\n'),
            line;

        for (i = 0; i < lines.length - 1; i++) {
            line = lines[i].split(' ');
            e.push(line);
        }
        return e;
    }
});
