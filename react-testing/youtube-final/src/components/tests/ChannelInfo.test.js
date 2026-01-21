/**
 * ChannelInfo 테스트는 어떻게 작성할 수 있을까?
 *
 * 우선 동작을 생각해보자.
 * 1. useQuery의 비동기 통신을 통해 채널의 프로필 이미지 url을 받는다.
 *  - 비동기 통신에 사용되는 queryFn은 youtube 클래스의 channelImageURL 멤버 함수 사용.
 * 2. 프로필 이미지가 있다면 img 태그를 사용해 화면에 표시한다.
 *  - 없다면 채널 이름만 표시
 *
 * 단위테스트는 네트워크 통신에 의존하면 안된다. => 됐다 안됐다 flicky함..
 * 그럼 변인요소인 youtube 클래스를 모킹해서 해당 컴포넌트에서 사용되는 channelImageURL 함수가 반환하는
 * 데이터를 고정해놓는다.
 */

import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import ChannelInfo from "../ChannelInfo";
import { withAllContexts } from "../../tests/utils";

describe("@/src/components/ChannelInfo.jsx", () => {
  const youtube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => youtube.channelImageURL.mockReset());

  it("컴포넌트가 렌더링된다.", async () => {
    youtube.channelImageURL.mockImplementation(() => "url-jimin");

    const channelName = "name-jimin";
    const { asFragment } = renderChannelInfo(channelName);

    await waitFor(() => screen.findByText("name-jimin"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("url이 있다면 이미지를 표시한다.", async () => {
    youtube.channelImageURL.mockImplementation(() => "url-jimin");

    const channelName = "name-jimin";
    renderChannelInfo(channelName);

    await waitFor(async () => {
      const img = await screen.findByRole("img", { name: channelName });

      expect(img).toBeInTheDocument();
    });
  });

  it("url이 없다면 이름만 표시한다.", async () => {
    youtube.channelImageURL.mockImplementation(() => {
      throw new Error("error");
    });

    const channelName = "name-jimin";
    renderChannelInfo(channelName);

    const img = screen.queryByRole("img", { name: channelName });

    expect(img).toBeNull();
    expect(screen.getByText(channelName)).toBeInTheDocument();
  });

  /**
   * 테스트 코드에서 중복되는 코드를 어디까지 함수로 만들어야 할까?
   * 테스트 코드는 문서화이기도 하다. 즉, 이 테스트 코드를 보고 어떤 동작을 하는지, 어떤 테스트를 하는지가 명확히 보여야만 한다.
   *
   * 과한 추상화는 테스트 코드와 추상화된 함수 간의 스크롤링만 만들 뿐이다.
   * 추상화를 어디까지 허용할지는 개발자에 달려있다. 가령 이 코드에서 목 함수를 수정하는 코드를 renderChannelInfoWithCallback 함수로 변경해 내부에서 실행한다고 가정해보자.
   *
   * 각각의 테스트 코드는 간결해지겠지만, 어디까지나 이건 테스트를 작성한 내 기준에서일 뿐인다. 이 테스트 코드를 처음 보는 사람은 결국 작성된 테스트 코드에서 사용되는 함수를
   * 확인하기 위해 위 아래로 스크롤링을 반복하게 될 것이다.
   *
   * 물론 이건 개발자마다 선호하는 방식이 다르겠지만, 나는 테스트 코드는 하나의 테스트 블럭이 명확히 이해되는 선까지 추상화하는게 옳다고 생각한다.
   * 현재 ChannelInfo에선 라우트 변경이 일어나지 않는다는 점, 항상 동일한 컴포넌트를 렌더링한다는 기준에서 renderChannelInfo 함수로 추상화하는건 비교적 괜찮다는 입장이다.
   *
   */
  function renderChannelInfo(channelName) {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <ChannelInfo id="id-jimin" name={channelName} />,
      },
    ]);

    return render(withAllContexts(<Stub />, youtube));
  }
});
