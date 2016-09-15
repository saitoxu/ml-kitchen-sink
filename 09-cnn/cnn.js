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
        i, j,
        fc = new FCLayer(),
        error = INITIALERR;

    for (i = 0; i < FILTERNO; i++) {
        filters.push(new Filter());
    }

    while (error > LIMIT) {
        error = 0.0;
        for (i = 0; i < input.length; i++) {
            for (j = 0; j < FILTERNO; j++) {
                let convOut = filters[j].conv(input[i].getImage());
            }
            // TODO
        }
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
});

class Filter {
    constructor(size) {
        let i, j, ary,
            s = size || FILTERSIZE;
        this.filter = [];
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
            convOut = [],
            start = Math.floor(FILTERSIZE / 2);
        for (i = start; i < INPUTSIZE - start; i++) {
            convOut.push(row = []);
            for (j = start; j < INPUTSIZE - start; j++) {
                row.push(this.calcConv(image, i, j));
            }
        }
    }

    calcConv(image, i, j) {
        return 0; // TODO
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

class FCLayer { // fully connected layer
    constructor() {
        let i, j, ary;
        this.interLayer = [];
        this.outputLayer = [];
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
}
