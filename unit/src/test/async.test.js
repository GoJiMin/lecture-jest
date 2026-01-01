const fetchUser = require("../async");

/**
 * 가장 직관적인건 async/await과 try-catch를 사용하는 방법?
 */
describe("fetchUser", () => {
  it("요청이 성공하면 유저 데이터를 반환한다.", async () => {
    const data = await fetchUser();

    expect(data).toEqual({ name: "지민", id: "jimin" });
  });

  it("요청이 실패하면 에러를 던진다.", async () => {
    try {
      await fetchUser("error");
    } catch (error) {
      expect(error).toMatch("INTERNAL_SERVER_ERROR");
    }
  });

  it("요청이 성공하면 유저 데이터를 반환한다. - done 버전", (done) => {
    fetchUser().then((data) => {
      expect(data).toEqual({ name: "지민", id: "jimin" });
      done();
    });
  });

  it("요청이 성공하면 유저 데이터를 반환한다. - return 버전", () => {
    return fetchUser().then((data) => {
      expect(data).toEqual({ name: "지민", id: "jimin" });
    });
  });

  it("요청이 성공하면 유저 데이터를 반환한다. - resolves 버전", () => {
    return expect(fetchUser()).resolves.toEqual({ name: "지민", id: "jimin" });
  });

  it("요청이 실패하면 에러를 던진다. rejects 버전", () => {
    return expect(fetchUser("error")).rejects.toMatch("INTERNAL_SERVER_ERROR");
  });
});
