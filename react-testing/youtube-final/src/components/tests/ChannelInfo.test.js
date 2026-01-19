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
import { withAllContexts } from "./utils";

describe("@/src/components/ChannelInfo.jsx", () => {
  const youtube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => youtube.channelImageURL.mockReset());

  it("컴포넌트가 렌더린된다.", async () => {
    youtube.channelImageURL.mockImplementation(() => "url-jimin");
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <ChannelInfo id="id-jimin" name="name-jimin" />,
      },
    ]);

    render(withAllContexts(<Stub />, youtube));

    await waitFor(() => screen.findByText("name-jimin"));
  });
});
