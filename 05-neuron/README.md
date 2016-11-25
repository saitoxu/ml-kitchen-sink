Neuron
---
ニューロンはニューラルネットワークの構成要素です。

脳の神経細胞を模倣して、入力を受けて、
入力の総量が閾値を超えたら反応して1、超えなければ0を出力します。

詳しくは下のリンクを見てください。

[Neural Network](https://en.wikipedia.org/wiki/Artificial_neural_network)

## Description
ここでは論理積を作ってみます。

論理積は以下の入力と出力の組み合わせになります。

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
