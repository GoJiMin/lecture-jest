class ProductService {
  // DI.. 의존성 역전 시켜서 클라이언트 구현체를 외부로부터 받아오게 변경
  constructor(productClient) {
    this.productClient = productClient;
  }

  async fetchAvailableProducts() {
    const products = await this.productClient.fetchProducts();

    return products.filter((product) => product.available);
  }
}

module.exports = ProductService;
