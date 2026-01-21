/**
 * Videos 컴포넌트를 테스트하고 싶다..
 *
 * 우선 이 컴포넌트의 스펙을 정의해보자..
 *
 * 1. 쿼리스트링으로 키워드가 전달되며 해당 키워드로 비동기 통신을 수행한다.
 * 2. 데이터 요청 중 로딩 상태를 표시한다.
 * 3. 요청 실패 시 안내 문구를 표시한다.
 * 4. 요청 성공 시 비디오 데이터를 표시한다.
 *
 * 변인요소는?
 * 1. 네트워크 통신
 * 2. 비디오 카드를 표시할 필요가 있는지?
 */

import { createRoutesStub } from "react-router";
import { render } from "@testing-library/react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/dom";
import Videos from "../Videos";
import { withAllContexts } from "../../tests/utils";
import { videosStub, videoStub } from "../../tests/videos";

describe("@/pages/Videos.jsx", () => {
  const youtube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    youtube.search.mockImplementation((keyword) => {
      return keyword ? [videoStub] : videosStub;
    });
  });

  afterEach(() => youtube.search.mockReset());

  it("검색 결과가 표시된다.", async () => {
    const keyword = "jimin";

    renderVideosWithPath(`/${keyword}`);

    expect(youtube.search).toHaveBeenCalledWith(keyword);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });
  });

  it("비디오 리스트가 표시된다.", async () => {
    renderVideosWithPath();

    expect(youtube.search).toHaveBeenCalledWith(undefined);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(videosStub.length);
    });
  });

  it("요청 중 로딩 상태가 표시된다.", async () => {
    youtube.search.mockImplementation(() => videosStub);

    renderVideosWithPath();

    await screen.findByText("Loading...");
  });

  it("요청 실패 시 문구가 표시된다.", async () => {
    youtube.search.mockImplementation(() => {
      throw new Error();
    });

    renderVideosWithPath();

    await screen.findByText("Something is wrong 😖");
  });

  function renderVideosWithPath(path = "/") {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: Videos,
      },
      {
        path: "/:keyword",
        Component: Videos,
      },
    ]);

    return render(withAllContexts(<Stub initialEntries={[path]} />, youtube));
  }
});
