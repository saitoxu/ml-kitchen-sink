class InductiveLearning {
  constructor(count) {
    this._count = count;
    this._result = null;
  }

  fit(teachers) {
    const size = teachers[0].length - 1;
    let bestScore = 0;
    let score, candidate;

    for (let i = 0; i < this._count; i++) {
      candidate = this._makeCandidate(size);
      score = this._calcScore(candidate, teachers);

      if (score > bestScore) {
        this._result = candidate;
        bestScore = score;
      }
    }
  }

  predict(testData) {
    const accuracy = this._calcScore(this._result, testData) / testData.length;
    return {
      result: this._result,
      accuracy: accuracy,
    };
  }

  _makeCandidate(size) {
    const candidate = [];
    for (let i = 0; i < size; i++)
      candidate.push(Math.floor(Math.random() * 3));
    return candidate;
  }

  _calcScore(candidate, teachers) {
    const size = candidate.length;
    const max = size;
    const resultIdx = size;
    let score = 0;
    let point, teacher;

    for (let i = 0; i < teachers.length; i++) {
      point = 0, teacher = teachers[i];
      for (let j = 0; j < size; j++) {
        if (candidate[j] == 2 || candidate[j] == teacher[j])
          point++;
      }

      if ((point == max && teacher[resultIdx] == 1) ||
          (point != max && teacher[resultIdx] == 0)) {
        score++;
      }
    }
    return score;
  }
}

module.exports = InductiveLearning;
