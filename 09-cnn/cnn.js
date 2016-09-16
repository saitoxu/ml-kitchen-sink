'use strict';

let fs = require('fs'),
    random = require('../lib/random.js');

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
        i, j, m, n,
        fc = new FCLayer(f),
        error = INITIALERR;

    for (i = 0; i < FILTERNO; i++) {
        filters.push(new Filter());
    }

    while (error > LIMIT) {
        error = 0.0;
        for (i = 0; i < input.length; i++) {
            for (j = 0; j < FILTERNO; j++) {
                let convOut = filters[j].conv(input[i].getImage()),
                    poolOut = pool(convOut);

                for (m = 0; m < POOLOUTSIZE; m++) {
                    for (n = 0; n < POOLOUTSIZE; n++) {
                        // TODO
                    }
                }
            }
        }
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

class Filter {
    constructor(size) {
        let i, j, ary,
            s = size || FILTERSIZE;
        this.filter = [];
        this.size = s;
        for (i = 0; i < s; i++) {
            this.filter.push(ary = []);
            for (j = 0; j < s; j++) {
                ary.push(random.get(-1, 1, false));
            }
        }
    }

    get() {
        return this.filter;
    }

    conv(image) {
        let i, j, row,
            convOut = [];
        for (i = 0; i < INPUTSIZE - (this.size - 1); i++) {
            convOut.push(row = []);
            for (j = 0; j < INPUTSIZE - (this.size - 1); j++) {
                row.push(this.calcConv(image, i, j));
            }
        }
        return convOut;
    }

    calcConv(image, i, j) {
        let m, n, sum = 0;
        for (m = 0; m < this.size; m++) {
            for (n = 0; n < this.size; n++) {
                sum += image[i + m][j + n] * this.filter[m][n];
            }
        }
        return sum;
    }
}

class InputData {
    constructor() {
        this.teacher = null;
        this.image = null;
    }

    getTeacher() {
        return this.teacher;
    }

    setTeacher(teacher) {
        this.teacher = teacher;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }
}

// TODO use Neuron
class FCLayer { // fully connected layer
    constructor(f) {
        let i, j, ary;
        this.interLayer = [];
        this.outputLayer = [];
        this.f = f;
        for (i = 0; i < HIDDENNO; i++) {
            this.interLayer.push(ary = []);
            for (j = 0; j < POOLOUTSIZE * POOLOUTSIZE * FILTERNO + 1; j++) {
                ary.push(random.get(-1, 1, false));
            }
        }
        for (i = 0; i < HIDDENNO; i++) {
            this.outputLayer.push(random.get(-1, 1, false));
        }
    }

    getInterLayer() {
        return this.interLayer;
    }

    getOutputLayer() {
        return this.outputLayer;
    }

    forward(e) {
        let i, j, u, o;
        // TODO
    }
}
