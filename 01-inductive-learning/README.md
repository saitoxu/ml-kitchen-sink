Inductive Learning
---
Inductive Learning is a very simple algorithm.

It generates some patterns to match with training data,
and calculate the score and select the best pattern.

## Description
Question is below.

We want to predict whether the stock price of company x will be up or down tomorrow.

To simplify the question, the stock price of company x tomorrow
only depends on whether the stock price of company a, ..., j is up or down today.

Then, the data can be described as below.
1 means UP, and 0 means DOWN.

```
a b c d e f g h i j x
0 1 1 0 1 1 1 1 1 1 1
...
```

This inductive learning generates a pattern like below,
and compare it with each training data,
and calculate the score.

Score represents how many data the pattern can match with.

```
a b c d e f g h i j
2 2 1 2 1 2 0 2 2 2
```

2 is like a wild card to match both 0 and 1.

This algorithm generates some patterns like above,
and select the pattern having the best score.

## Usage
It is easy to use.

1. Give training data to `fit()`.
2. Give test data to `predict()`.
3. You can get the best pattern and the accuracy.

For more detail, please check [example.js](https://github.com/saitoxu/ml-kitchen-sink/blob/master/01-inductive-learning/example.js).

```js
const il = new InductiveLearning(10000);

il.fit(teachers);
console.log(il.predict(testData));
// e.g. { result: [ 2, 2, 1, 2, 1, 2, 2, 2, 2, 2 ], accuracy: 0.78 }
```
