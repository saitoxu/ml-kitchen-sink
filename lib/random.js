'use strict';

exports.get = function(minimum, maximum, integer) {
    let min = minimum || 0,
        max = maximum || 1,
        int = integer || false,
        value;

    if (int)
        value = Math.floor(Math.random() * (max - min + 1)) + min;
    else
        value = Math.random() * (max - min) + min;

    return value;
}
