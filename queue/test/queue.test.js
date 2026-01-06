/**
 * 이번에도 마찬가지로 TDD를 이용한 queue 구현..
 *
 * 테스트를 작성하는 이유에 대해 다시 생각해보자면, 코드를 자신 있게 배포할 수 있다?
 * 이것도 물론 좋은 이유인듯 한데, 문서화의 장점도 있다고 생각.. stack에서 작성한 테스트를 다시 보자면,
 *
 * 테스트 한 줄, 한 줄이 스택의 요구사항 명세이기도 함.. 이는 결국 1달..2달..N달 이후 다시 코드를 볼 때
 * 좋은 문서가 됨. 테스트하고 있는 코드가 어떤 요구사항을 만족하는지를 빠르게 파악이 가능..
 *
 * 이번에는 굳이 큐의 동작을 주석에 적지 말고 바로 요구사항으로써 테스트를 작성해봅시다.
 */

const Queue = require("../queue");

describe("Queue", () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  it("큐는 길이 0으로 초기화된다.", () => {
    expect(queue.size()).toBe(0);
  });

  describe("push", () => {
    it("인자를 전달하지 않으면 에러가 발생한다.", () => {
      expect(() => queue.push()).toThrow("인자를 전달해주세요.");
    });

    it("데이터를 삽입할 수 있다.", () => {
      queue.push(5);

      expect(queue.size()).toBe(1);
    });
  });

  describe("pop", () => {
    it("큐가 비어있을 경우 에러가 발생한다.", () => {
      expect(() => queue.pop()).toThrow("큐에 요소가 존재하지 않습니다.");
    });

    it("가장 먼저 들어간 요소를 반환 후 제거한다.", () => {
      queue.push(5);
      queue.push(6);

      const poped = queue.pop();

      expect(poped).toBe(5);
      expect(queue.size()).toBe(1);
    });
  });

  describe("front", () => {
    it("큐가 비어있을 경우 에러가 발생한다.", () => {
      expect(() => queue.front).toThrow("큐에 요소가 존재하지 않습니다.");
    });

    it("큐의 가장 첫 번째 요소를 반환한다.", () => {
      queue.push(5);
      queue.push(6);
      queue.push(9);

      expect(queue.front).toBe(5);
    });
  });

  describe("rear", () => {
    it("큐가 비어있을 경우 에러가 발생한다.", () => {
      expect(() => queue.rear).toThrow("큐에 요소가 존재하지 않습니다.");
    });

    it("큐의 가장 마지막 요소를 반환한다.", () => {
      queue.push(6);
      queue.push(4);
      queue.push(2);

      expect(queue.rear).toBe(2);
    });
  });
});
