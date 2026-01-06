class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  #validateIsEmpty() {
    if (!this.head) {
      throw new Error("큐에 요소가 존재하지 않습니다.");
    }
  }

  get front() {
    this.#validateIsEmpty();

    return this.head.data;
  }

  get rear() {
    this.#validateIsEmpty();

    return this.tail.data;
  }

  size() {
    return this.length;
  }

  push(data) {
    if (!data) {
      throw new Error("인자를 전달해주세요.");
    }

    const node = {
      data,
      next: null,
    };

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  pop() {
    this.#validateIsEmpty();

    const data = this.head.data;

    this.head = this.head.next;
    this.length--;

    return data;
  }
}

module.exports = Queue;
