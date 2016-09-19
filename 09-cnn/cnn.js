'use strict';

let fs = require('fs'),
    Filter = require('./filter.js'),
    FCLayer = require('./fclayer.js'),
    InputData = require('./inputdata.js');

const INPUTSIZE = 11;
const FILTERNO = 2;
const FILTERSIZE = 3;
const POOLSIZE = 3;
const POOLOUTSIZE = 3;
const LIMIT = 0.001;
const INITIALERR = 100;
const HIDDENNO = 3;
const ALPHA = 10;

fs.readFile('data.txt', (err, data) => {
    let input = decode(data.toString()),
        filters = [],
        i, j, m, n, o,
        max = POOLOUTSIZE * POOLOUTSIZE * FILTERNO,
        fc = new FCLayer(f, HIDDENNO, max, ALPHA, 1),
        ef = [],
        error = INITIALERR;

    for (i = 0; i < FILTERNO; i++) {
        filters.push(new Filter(FILTERSIZE, INPUTSIZE));
    }

    while (error > LIMIT) {
        error = 0.0;
        for (i = 0; i < input.length; i++) {
            for (j = 0; j < FILTERNO; j++) {
                let convOut = filters[j].conv(input[i].getImage()),
                    poolOut = pool(convOut);

                for (m = 0; m < POOLOUTSIZE; m++) {
                    for (n = 0; n < POOLOUTSIZE; n++) {
                        ef[j * POOLOUTSIZE * POOLOUTSIZE + POOLOUTSIZE * m + n] = poolOut[m][n];
                    }
                }
                ef[POOLOUTSIZE * POOLOUTSIZE * FILTERNO] = input[i].getTeacher();
            }
            o = fc.forward(ef)[0];
            fc.learnOutputLayer(ef);
            fc.learnInterLayer(ef);
            error += (o - input[i].getTeacher()) * (o - input[i].getTeacher());
        }
    }

    for (i = 0; i < input.length; i++) {
        for (j = 0; j < FILTERNO; j++) {
            let convOut = filters[j].conv(input[i].getImage()),
                poolOut = pool(convOut);

            for (m = 0; m < POOLOUTSIZE; m++) {
                for (n = 0; n < POOLOUTSIZE; n++) {
                    ef[j * POOLOUTSIZE * POOLOUTSIZE + POOLOUTSIZE * m + n] = poolOut[m][n];
                }
            }
            ef[POOLOUTSIZE * POOLOUTSIZE * FILTERNO] = input[i].getTeacher();
        }
        o = fc.forward(ef);
        console.log('%d\t%d\t%d', i, input[i].getTeacher(), o);
    }

    function pool(convOut) {
        let i, j, ary,
            poolOut = [];
        for (i = 0; i < POOLSIZE; i++) {
            poolOut.push(ary = []);
            for (j = 0; j < POOLSIZE; j++) {
                ary.push(maxPooling(convOut, i, j));
            }
        }
        return poolOut;
    }

    function maxPooling(convOut, i, j) {
        let m, n, max = 0.0;
        for (m = POOLOUTSIZE * i; m < POOLOUTSIZE * (i + 1); m++) {
            for (n = POOLOUTSIZE * j; n < POOLOUTSIZE * (j + 1); n++) {
                if (max < convOut[m][n]) max = convOut[m][n];
            }
        }
        return max;
    }

    function decode(data) {
        let input = [],
            lines = data.split('\n'),
            indata, image, i;

        for (i = 0; i < lines.length - 1; i++) {
            if (i % (INPUTSIZE + 1) == 0) {
                indata = new InputData();
                image = [];
                indata.setTeacher(parseInt(lines[i]));
                indata.setImage(image);
                input.push(indata);
            } else {
                image.push(lines[i].split(' '));
            }
        }
        return input;
    }

    function f(u) {
        return 1.0 / (1.0 + Math.exp(-u));
    }
});
