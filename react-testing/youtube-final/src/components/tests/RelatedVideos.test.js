/**
 * RelatedVideos 컴포넌트의 테스트 코드를 작성하고 싶다.
 *
 * 먼저 해당 컴포넌트의 동작을 정리해보자.
 *
 * 1. 비동기 통신을 통해 연관 비디오 데이터를 요청한다.
 * 2. 데이터 로딩 시 화면에 'Loading...' 텍스트를 표시한다.
 * 3. 요청 실패 시 화면에 'Something is wrong 😖' 텍스트를 표시한다.
 * 4. 요청 성공 시 화면에 비디오 카드를 표시한다.
 *
 * 이 테스트에서의 변인 요소는 무엇이 있을까?
 * 역시나 네트워크 의존성을 분리해야만 한다.
 *
 * 그럼 어떤 동작을 테스트해야 할까?
 * 1. 컴포넌트가 렌더링된다.
 * 2. 데이터 요청 중 로딩 상태를 표시한다.
 * 3. 요청 실패 시 에러를 표시한다.
 * 4. 요청 성공 시 비디오 카드를 표시한다.
 */

import { createRoutesStub } from "react-router";
import { videosStub } from "../../tests/videos";
import RelatedVideos from "../RelatedVideos";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { withAllContexts } from "../../tests/utils";

describe("@/src/components/RelatedVideos.jsx", () => {
  // 네트워크 의존성 제거를 위한 모킹
  const youtube = {
    relatedVideos: jest.fn(),
  };
  const title = "title-jimin";

  afterEach(() => youtube.relatedVideos.mockReset());

  it("컴포넌트가 렌더링된다.", async () => {
    youtube.relatedVideos.mockImplementation(() => videosStub);

    const { asFragment } = renderRelatedVideos();

    // 비동기 통신 중엔 로딩이 표시되니 사라질 때까지 대기
    await waitForElementToBeRemoved(screen.getByText("Loading..."));
    expect(asFragment()).toMatchSnapshot();
  });

  it("요청 중 로딩 상태가 표시된다.", () => {
    youtube.relatedVideos.mockImplementation(() => videosStub);

    renderRelatedVideos();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("요청 실패 시 에러 안내가 표시된다.", async () => {
    youtube.relatedVideos.mockImplementation(() => {
      throw new Error();
    });

    renderRelatedVideos();

    await waitFor(() =>
      expect(screen.getByText("Something is wrong 😖")).toBeInTheDocument(),
    );
  });

  it("요청 성공 시 데이터가 리스트 형태로 표시된다.", async () => {
    youtube.relatedVideos.mockImplementation(() => videosStub);

    renderRelatedVideos();

    // 전달된 title 인자가 함께 불렸는지?
    expect(youtube.relatedVideos).toHaveBeenCalledWith(title);

    await waitFor(() => {
      const list = screen.getAllByRole("listitem");

      // 화면에 표시된 리스트 아이템이 stub 배열 길이와 일치하는지?
      expect(list).toHaveLength(videosStub.length);
    });
  });

  function renderRelatedVideos() {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <RelatedVideos title={title} />,
      },
    ]);

    return render(withAllContexts(<Stub />, youtube));
  }
});
