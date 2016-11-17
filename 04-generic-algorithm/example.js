const fs = require('fs');
const GenericAlgorithm = require('./generic-algorithm');
const LIMIT = 300;
const POOLSIZE = 50;
const LAST = 100;
const RATE = 0.05;
const data = fs.readFileSync('data.txt').toString();
const ga = new GenericAlgorithm(data, LAST, RATE, LIMIT, POOLSIZE);

ga.fit();
console.log(ga.result());
