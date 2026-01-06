class Stack {
  constructor() {
    this.stack = [];
    this.tail = 0;
  }

  #validateStack() {
    if (!this.tail) {
      throw new Error("스택에 값이 존재하지 않습니다.");
    }
  }

  get lastValue() {
    this.#validateStack();

    return this.stack[--this.tail];
  }

  get firstValue() {
    this.#validateStack();

    return this.stack[0];
  }

  push(x) {
    if (!x) {
      throw new Error("저장할 값을 전달해주세요.");
    }

    this.stack[this.tail++] = x;
  }

  pop() {
    this.#validateStack();

    return this.stack[--this.tail];
  }

  size() {
    return this.tail;
  }
}

module.exports = Stack;
