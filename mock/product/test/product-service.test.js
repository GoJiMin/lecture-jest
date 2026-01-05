const ProductService = require("../product-service");
const StubProductClient = require("./stub-product-client");

describe("ProductService - DI", () => {
  let productService;

  beforeEach(() => {
    const productClient = new StubProductClient();
    productService = new ProductService(productClient);
  });

  it("구매 가능한 상품 목록만 반환한다.", async () => {
    const availableProducts = await productService.fetchAvailableProducts();

    expect(availableProducts).toEqual([
      {
        product: "청바지",
        price: 98000,
        available: true,
      },
    ]);
  });
});
