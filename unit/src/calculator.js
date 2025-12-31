class Calculator {
  constructor() {
    this.value = 0;
  }

  set(num) {
    this.value = num;

    return this;
  }

  clear() {
    this.value = 0;

    return this;
  }

  add(num) {
    const sum = this.value + num;
    if (sum > 100) {
      throw new Error("Value can not be greater than 100");
    }
    this.value = sum;

    return this;
  }

  subtract(num) {
    this.value = this.value - num;

    return this;
  }

  multiply(num) {
    this.value = this.value * num;

    return this;
  }

  divide(num) {
    this.value = this.value / num;

    return this;
  }
}

module.exports = Calculator;
