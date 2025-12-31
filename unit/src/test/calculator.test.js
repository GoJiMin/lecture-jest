const Calculator = require("../calculator");

// 비슷한 성격의 테스트를 그룹화 => describe
describe("계산기", () => {
  let calculator;

  // 각각의 테스트는 독립적이어야 함. beforeEach는 각 테스트가 실행되기 전 실행되는 함수. 테스트 후 실행은 afterEach
  // 만약 시작되기 전 한 번만 실행되어야 한다면 beforeAll도 있음..
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("계산기의 초기값은 0이다.", () => {
    expect(calculator.value).toBe(0);
  });

  it("5를 지정하면 계산기의 값은 5가 된다.", () => {
    expect(calculator.set(5).value).toBe(5);
  });

  it("초기화 시 계산기의 값은 0이 된다.", () => {
    expect(calculator.set(5).clear().value).toBe(0);
  });

  describe("더하기", () => {
    it("0 + 10 === 10", () => {
      expect(calculator.add(10).value).toBe(10);
    });

    it("더한 값이 100을 초과하면 에러가 발생한다.", () => {
      expect(() => calculator.add(101).value).toThrow(
        "Value can not be greater than 100"
      );
    });
  });

  it("10 - 10 === 0", () => {
    expect(calculator.set(10).subtract(10).value).toBe(0);
  });

  it("5 * 5 === 25", () => {
    expect(calculator.set(5).multiply(5).value).toBe(25);
  });

  describe("나누기", () => {
    it("0 / 0 === NaN", () => {
      expect(calculator.divide(0).value).toBeNaN();
    });

    it("1 / 0 === Infinity", () => {
      expect(calculator.set(1).divide(0).value).toBe(Infinity);
    });

    it("4 / 4 === 1", () => {
      expect(calculator.set(4).divide(4).value).toBe(1);
    });
  });
});
