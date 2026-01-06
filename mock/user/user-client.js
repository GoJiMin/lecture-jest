class UserClient {
  async login(id, password) {
    try {
      const res = await fetch("그냥 url", {
        method: "POST",
        body: JSON.stringify({
          id,
          password,
        }),
      });

      if (!res) {
        throw new Error("로그인 실패!");
      }

      return { isLoggedIn: true };
    } catch (error) {
      return {
        isLoggedIn: false,
        reason: error.message,
      };
    }
  }
}

module.exports = UserClient;
