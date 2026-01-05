class ProductClient {
  async fetchProducts() {
    const res = await fetch("그냥url");

    return await res.json();
  }
}

module.exports = ProductClient;
