Genetic Algorithm
---
遺伝的アルゴリズムはデータ（解の候補）を遺伝子で表現した「個体」を複数用意し、
適応度の高い個体を優先的に選択して交叉（組み換え）・突然変異などの操作を繰り返しながら解を探索するアルゴリズムです。

[Genetic Algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm)

## Description
このプログラムではナップサック問題を解くことができます。

### What is Knapsack problem?
ナップサック問題は、価値と重さが決まっている複数の品物を容量が一定のナップサックに詰め込むとき、ナップサックに詰め込める品物の価値の和の最大値は何であるか？という問題です。

[Knapsack Problem](https://en.wikipedia.org/wiki/Knapsack_problem)

### Data Input
品物のデータは以下の形式で入力します。
1行ごとに1つの品物を入力し、最初に重さ、次に価値を入力します。

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
使い方は品物のデータといくつかのパラメータを渡すだけです。

1. 品物のデータといくつかのパラメータを引数に`GeneticAlgorithm`をインスタンス化します。
2. `fit()`でナップサック問題を解きます。
3. `result()`で求めた最適解の情報を表示します。

### Parameter
|Parameter|Meaning|Mandatory|
|:---|:---|:---|
|data|ナップサックに入れる候補となる品物の情報。データの形式は上述の通り。|true|
|LIMIT|ナップサックに入る容量の最大値|true|
|POOLSIZE|遺伝子の数|true|
|LAST|遺伝操作を行う回数|true|
|RATE|突然変異が発生する確率|true|

### Example
具体例は以下になります。

```js
const fs = require('fs');
const GeneticAlgorithm = require('./genetic-algorithm');
const LIMIT = 300;
const POOLSIZE = 50;
const LAST = 100;
const RATE = 0.05;
const data = fs.readFileSync('data.txt').toString();
const ga = new GenericAlgorithm(data, LAST, RATE, LIMIT, POOLSIZE);

ga.fit();
console.log(ga.result());
```

実行すると、下記のように解の情報が表示されます。

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
