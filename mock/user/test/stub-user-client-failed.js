class StubUserClientFailed {
  async login() {
    return {
      isLoggedIn: false,
      reason: "아이디 또는 패스워드를 확인해주세요.",
    };
  }
}
