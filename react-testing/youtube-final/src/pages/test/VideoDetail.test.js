/**
 * VideoDetail 컴포넌트를 테스트하고 싶다..
 *
 * 이 컴포넌트는 리액트 라우터에 의해 네비게이트 될 때 비디오 상태를 함께 전달 받는다.
 * 전달 받은 비디오 상태를 이용해 iframe을 사용해 화면에 동영상을 표시하고, 채널 정보와 연관 비디오 목록을 표시한다.
 *
 * 일종의 통합 테스트라고 볼 수 있을 거 같은데, 그렇다면 이 테스트 내부에서 ChannelInfo, RelatedVideos의 동작을
 * 테스트할 필요가 있을까?
 *
 * 이건 내 개인적인 생각으로 그럴 필요가 없을 거 같다. 이미 컴포넌트에 대한 단위 테스트는 작성되었고,
 * 잘 작동하는걸 확인했다. 그렇다면 이 페이지 컴포넌트가 비디오 상태를 전달 받고 각 컴포넌트로 인자를 잘 전달하는지만 테스트하면 되지 않을까?
 *
 * 인자만 전달되었다면, 이후 동작에 대한 테스트는 각 컴포넌트 마다 작성된 단위 테스트가 테스트해줄 것이다.
 */

import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";
import ChannelInfo from "../../components/ChannelInfo";
import RelatedVideos from "../../components/RelatedVideos";
import VideoDetail from "../VideoDetail";
import { videoStub } from "../../tests/videos";

// 해당 컴포넌트에 인자가 잘 전달되는지 확인하기 위해 모킹
jest.mock("../../components/ChannelInfo");
jest.mock("../../components/RelatedVideos");

describe("@/src/pages/VideoDetail.jsx", () => {
  afterEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });

  it("컴포넌트가 렌더링된다.", () => {
    const { title, channelId, channelTitle } = videoStub.snippet;
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: VideoDetail,
      },
    ]);

    render(
      <Stub
        initialEntries={[
          {
            pathname: "/",
            state: { video: videoStub },
          },
        ]}
      />,
    );

    expect(screen.getByTitle(title)).toBeInTheDocument();
    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      name: channelTitle,
    });
    expect(RelatedVideos.mock.calls[0][0]).toStrictEqual({
      title: title,
    });
  });
});
