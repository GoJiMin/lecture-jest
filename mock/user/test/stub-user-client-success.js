class StubUserClientSuccess {
  async login() {
    return { isLoggedIn: true };
  }
}
