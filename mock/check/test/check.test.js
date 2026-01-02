const check = require("../check");

/**
 * check 함수를 어떻게 테스트할까?
 *
 * check 함수의 동작을 생각해보자..
 *
 * 1. 전달된 조건이 참일 경우 onSuccess 콜백을 실행한다.
 * 2. 전달된 조건이 거짓일 경우 onFail 콜백을 실행한다.
 * 3. 각 콜백은 인자로 'yes'와 'no'를 전달 받는다.
 */

describe("check", () => {
  let onSuccess;
  let onFail;

  beforeEach(() => {
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  it("전달된 조건이 참일 경우 onSuccess가 호출된다.", () => {
    check(() => true, onSuccess, onFail);

    // 조건이 참이라면 1번만 호출되어야 한다.
    expect(onSuccess).toHaveBeenCalledTimes(1);
    // yes와 함께 호출되어야 한다.
    expect(onSuccess).toHaveBeenCalledWith("yes");
    // onFail은 호출되지 않아야 한다.
    expect(onFail).toHaveBeenCalledTimes(0);
  });

  it("전달된 조건이 거짓일 경우 onFail이 호출된다.", () => {
    check(() => false, onSuccess, onFail);

    expect(onFail).toHaveBeenCalledTimes(1);
    expect(onFail).toHaveBeenCalledWith("no");
    expect(onSuccess).toHaveBeenCalledTimes(0);
  });
});
