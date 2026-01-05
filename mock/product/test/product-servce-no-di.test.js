const ProductService = require("../product-service-no-di");
const ProductClient = require("../product-client");

/**
 * ProductService 클래스의 fetchAvailableProducts 함수의 동작을 테스트하고 싶다.
 *
 * 이 함수는 ProductClient 클래스의 fetchProducts로 가져온 모든 상품 목록에서 구매 가능한 상품만 필터링하는 함수.
 *
 * 요구사항을 먼저 분석해보자면,
 * ProductService 클래스의 fetchAvailableProducts를 호출하면 구매 가능한 상품만 필터링해 반환한다.
 * => fetchAvailableProducts 함수는 내부적으로 ProductClient 클래스의 fetchProducts로 데이터를 요청한다.
 *
 * fetchAvailableProducts 함수가 구매 가능한 상품만을 반환하는지 테스트하고 싶은데, 내부적으로 네트워크 요청에 대한 테스트도
 * 동시에 일어나는 문제가 발생한다. 즉, 독립적인 테스트가 불가능하고 네트워크 상태에 의존하는 테스트가 일어나고 만다.
 *
 * 그렇기 때문에 ProductClient의 fetchProducts라는 함수를 모킹해 독립적인 테스트 환경을 만들어야 한다.
 *
 * jest 공식 문서상으로 .mock 함수를 사용해 모듈 자체를 모킹하는 방법을 안내하고 있다.
 */

jest.mock("../product-client");
describe("ProductService", () => {
  // fetchProducts 함수가 네트워크에 의존하지 않게 반환할 데이터 모킹
  const fetchProducts = jest.fn(async () => [
    { product: "청바지", price: 98000, available: true },
    { product: "코트", price: 398000, available: false },
  ]);

  // mockImplementation 함수를 사용해 기본 구현을 재정의 가능
  ProductClient.mockImplementation(() => ({
    fetchProducts,
  }));
  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it("구매 가능한 상품 목록만 반환한다.", async () => {
    const availableProducts = await productService.fetchAvailableProducts();

    expect(fetchProducts).toHaveBeenCalledTimes(1);
    expect(availableProducts).toEqual([
      {
        product: "청바지",
        price: 98000,
        available: true,
      },
    ]);
  });
});
