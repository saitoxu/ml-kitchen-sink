'use strict';

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

module.exports = InputData;
