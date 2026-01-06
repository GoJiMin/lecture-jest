class UserService {
  constructor(userClient) {
    this.userClient = userClient;
    this.isLoggedIn = false;
    this.reason = null;
  }

  async login(id, password) {
    if (!this.isLoggedIn) {
      const data = await this.userClient.login(id, password);

      if (data.isLoggedIn) {
        this.isLoggedIn = true;
        return;
      }

      this.isLoggedIn = false;
      this.reason = data.reason;
    }
  }
}

module.exports = UserService;
