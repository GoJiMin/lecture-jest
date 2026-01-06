const UserService = require("../user-service");
const UserClient = require("../user-client");

/**
 * UserService에 대한 테스트를 작성하고 싶다.
 *
 * 우선 UserService의 동작을 생각해보자.
 *
 * 1. 인스턴스가 생성되면 isLoggedIn = false, reason = null로 초기화된다.
 * 2. login 함수를 호출할 수 있다.
 * - login 함수는 로그인하지 않았을 때만 호출된다. 즉, 로그인 상태에서는 호출되지 않는다.
 * - 로그인이 성공한 경우 isLoggedIn 값을 true로 설정한다.
 * - 로그인에 실패한 경우 isLoggedIn 값을 false로 설정하고, 멤버 변수 reason에 이유를 저장한다.
 *
 * 단위 테스트는 독립적이어야 한다.
 * 즉, UserService 클래스 내부에서 호출되는 this.userClient.login 함수라는 네트워크 의존을 제거해야 한다.
 *
 * 생각해볼만한 점이라면 UserService의 login 함수는 의존성으로 주입된 userClient의 성공/실패 여부에 따라
 * 멤버 변수 isLoggedIn, reason의 값이 모두 달라진다.
 *
 * 이런 경우 stub이 좋을까 mock이 좋을까?
 * 우선 stub은 실제 객체의 동작을 지워버리고 미리 정해진 값을 반환하게 할 수 있다는 점인데,
 * 지금 같은 경우엔 로그인 상태일 경우 로그인 함수가 재호출되지 않았는지를 확인할 수 있어야 한다.
 * 그렇다면 stub만으로는 결국 부족하고 mock을 사용할 수밖에 없을듯
 */

jest.mock("../user-client");
describe("UserService", () => {
  let userService;
  let userClient;

  beforeEach(() => {
    userClient = {
      login: jest.fn(),
    };
    UserClient.mockImplementation(() => userClient);

    userService = new UserService(userClient);
  });

  it("인스턴스는 isLoggedIn = false, reason = null로 초기화된다.", () => {
    expect(userService.isLoggedIn).toBe(false);
    expect(userService.reason).toBe(null);
  });

  it("로그인에 성공한 경우 isLoggedIn 값은 true가 된다.", async () => {
    userClient.login.mockResolvedValue({ isLoggedIn: true });
    await userService.login("id", "pw");

    expect(userService.isLoggedIn).toBe(true);
  });

  it("로그인 상태일 경우 로그인 함수를 호출하지 않는다.", async () => {
    userClient.login.mockResolvedValue({ isLoggedIn: true });

    await userService.login("id", "pw");
    await userService.login("id", "pw");

    expect(userClient.login).toHaveBeenCalledTimes(1);
  });

  it("로그인에 실패한 경우 이유를 멤버 변수에 할당한다.", async () => {
    userClient.login.mockResolvedValue({
      isLoggedIn: false,
      reason: "아이디 또는 패스워드를 다시 확인해주세요.",
    });

    await userService.login("id", "pw");

    expect(userService.isLoggedIn).toBe(false);
    expect(userService.reason).toBe(
      "아이디 또는 패스워드를 다시 확인해주세요."
    );
  });
});
