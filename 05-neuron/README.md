Neuron
---
Neurons are components of neural networks that mimic neurons of the brain.


It receives one or more inputs and generates output (synapse) from the sum of them.

Normally, the sum of each node is weighted and passed to a nonlinear function called a transfer function.

Please see the following link for more detail.

[Neural Network](https://en.wikipedia.org/wiki/Artificial_neural_network)

## Description
Let's make a logical AND here.

The logical AND is a combination of the following inputs and outputs.

|Input1|Input2|Output|
|:---|:---|:---|
|0|0|0|
|0|1|0|
|1|0|0|
|1|1|1|

## Usage

```bash
$ cat data.txt
0 0
0 1
1 0
1 1

$ node example.js
[ 0, 0 ] 0
[ 0, 1 ] 0
[ 1, 0 ] 0
[ 1, 1 ] 1
```
