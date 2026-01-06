/**
 * 스택을 TDD로 구현한다면 어떻게 구현할 수 있을까?
 *
 * 우선 TDD는 테스트 코드를 먼저 작성하고, 그 테스트를 통과할 수 있는 코드를 작성하는 개발 방법이다.
 *
 * 뭐 구체적으로 어떤 기술을 사용하는게 아니라 그냥 테스트 먼저 작성하고 그 다음 코드 작성하면 TDD다.
 *
 * 유의할점으로 테스트를 모두 작성하고 코드를 작성하지 않는다.
 * => 간단한 테스트를 작성하고, 그 테스트를 통과할 수 있는 간단한 코드를 작성한다.
 * => Red => Green => Refactor
 * => 실패 => 통과 => 그리고 리팩터링
 *
 * TDD가 성공하기 위해선 내가 구현하고자 하는 기능의 요구사항을 명확히 알고 있어야만 한다.
 *
 * 스택이라면 확실히 가능할듯.
 *
 * 스택의 동작은 무엇일까? 우선 LIFO의 특성을 가진 자료구조다.
 * 마지막에 들어간 놈이 가장 먼저 나온다.
 *
 * 1. 스택에 push하면 배열에 값을 집어넣는다.
 * 2. 스택에서 pop하면 배열의 마지막에 들어간 값이 나온다.
 *   - 스택이 비어있다면 아무 값도 나오지 않는다.
 * 3. 스택은 원칙적으로 들어간 값을 search하는게 불가능하다.
 * 4. 대신 스택의 가장 첫번째 값과 마지막 값은 조회가 가능하다.
 */

const Stack = require("../stack");

describe("Stack", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it("스택은 빈 배열로 초기화된다.", () => {
    expect(stack.size()).toBe(0);
  });

  describe("push", () => {
    it("값을 넣을 수 있다.", () => {
      stack.push(5);

      expect(stack.size()).toBe(1);
    });

    it("인자를 전달하지 않으면 에러가 발생한다.", () => {
      expect(() => stack.push()).toThrow("저장할 값을 전달해주세요.");
    });
  });

  describe("조회", () => {
    it("비어있을 때 조회하면 에러가 발생한다.", () => {
      expect(() => stack.firstValue).toThrow("스택에 값이 존재하지 않습니다.");
      expect(() => stack.lastValue).toThrow("스택에 값이 존재하지 않습니다.");
    });

    it("가장 먼저 들어간 값과 마지막에 들어간 값을 조회할 수 있다.", () => {
      stack.push(5);
      stack.push(6);

      expect(stack.firstValue).toBe(5);
      expect(stack.lastValue).toBe(6);
    });
  });

  describe("pop", () => {
    it("스택이 비어있을 때 pop하면 에러가 발생한다.", () => {
      expect(() => stack.pop()).toThrow("스택에 값이 존재하지 않습니다.");
    });

    it("스택이 비어있지 않을 경우, 마지막 값을 반환 후 제거한다.", () => {
      stack.push(6);

      expect(stack.pop()).toBe(6);
      expect(stack.size()).toBe(0);
    });
  });
});
