Genetic Algorithm
---
Genetic algorithm is an algorithm which prepares a plurality of "individuals" which represent data (candidate solutions) by genes, and selects individuals with high fitness preferentially and searches for solutions while repeating operations such as crossover (recombination) and mutation.

[Genetic Algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm)

## Description
This program can solve a knapsack problem.

### What is Knapsack problem?
The knapsack problem is a problem to find the maximum sum of the value of items that can be packed into knapsack when packing multiple items of which value and weight are fixed in a certain knapsack.

[Knapsack Problem](https://en.wikipedia.org/wiki/Knapsack_problem)

### Data Input
The data of items are entered in the following format.
Enter one item per line, first enter the weight, then the value.

```bash
$ cat data.txt
168 496
10 45
145 325
60 347
10 61
124 486
124 446
105 22
126 110
184 475
```

## Usage
The usage is simply to pass the item data and some parameters.

1. Initialize `GeneticAlgorithm` with data of items and some parameters.
2. Call `fit` to solve a knapsack problem.
3. Call `result` to show related information of the solution.

### Parameter
|Parameter|Meaning|Mandatory|Default|
|:---|:---|:---|---:|
|data|Information on candidate goods to be put in the knapsack. The format of the data is as described above.|true|-|
|LIMIT|The maximum weights which can be packed in knapsack|true|-|
|POOLSIZE|The number of genes|false|50|
|LAST|The count of genetic manipulation|false|100|
|RATE|Probability of mutation|false|0.01|

### Example
A concrete example is as below.

```js
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
```

When executed, information of the solution is shown as below.

```bash
$ node example.js
{
  maxValue: 1038,
  totalWeight: 268,
  parcels: [
    { weight: 10, value: 45 },
    { weight: 10, value: 61 },
    { weight: 124, value: 486 },
    { weight: 124, value: 446 }
  ]
}
```
