const fs = require('fs');
const GeneticAlgorithm = require('./genetic-algorithm');
const LIMIT = 300;
const POOLSIZE = 50;
const LAST = 100;
const RATE = 0.05;
const data = fs.readFileSync('data.txt').toString();
const ga = new GeneticAlgorithm(data, LIMIT, POOLSIZE, LAST, RATE);

ga.fit();
console.log(ga.result());
