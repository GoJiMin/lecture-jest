// 테스트 과정에서 사용 가능한.. 대체 가능한 클래스..
// ProductService 클래스의 생성자 함수의 의존성을 역전 시켰기 때문에 외부로부터 클라이언트를 인자로 받음..
class StubProductClient {
  async fetchProducts() {
    return [
      { product: "청바지", price: 98000, available: true },
      { product: "코트", price: 398000, available: false },
    ];
  }
}

module.exports = StubProductClient;
