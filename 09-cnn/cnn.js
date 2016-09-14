'use strict';

let fs = require('fs'),
    random = require('../lib/random.js');

const INPUTSIZE = 11;
const FILTERSIZE = 3;

fs.readFile('data.txt', (err, data) => {
    let input = decode(data.toString()),
        filters = [ new Filter(), new Filter() ];

    console.log(filters);

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
                // TODO
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
