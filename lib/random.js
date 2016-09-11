'use strict';

exports.get = function(minimum, maximum, integer) {
    let min = minimum || 0,
        max = typeof maximum === 'number' ? Math.floor(maximum) : 1,
        int = integer || false;
        return (int) ? (Math.floor(Math.random() * (max - min + 1)) + min) :
                (Math.random() * (max - min) + min);
}
