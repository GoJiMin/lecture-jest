function fetchUser(type) {
  if (type === "error") {
    return Promise.reject("INTERNAL_SERVER_ERROR");
  }

  return Promise.resolve({ name: "지민", id: "jimin" });
}

module.exports = fetchUser;
