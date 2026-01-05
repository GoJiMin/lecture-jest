const ProductClient = require("./product-client");

class ProductService {
  constructor() {
    this.productClient = new ProductClient();
  }

  async fetchAvailableProducts() {
    const products = await this.productClient.fetchProducts();

    return products.filter((product) => product.available);
  }
}

module.exports = ProductService;
