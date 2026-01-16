/**
 * VideoCard 컴포넌트의 동작을 테스트하고 싶다.
 *
 * 그럼 VideoCard의 동작을 먼저 생각해봐야 한다.
 *
 * 1. 전달된 video 인자를 사용해 화면에 렌더한다.
 * 2. 비디오 카드를 클릭했을 때, 해당 비디오 정보를 가지고 상세 페이지로 이동한다.
 *
 * 나는 지금 단위 테스트를 하고 싶다. 즉, VideoCard라는 컴포넌트가 제대로 동작하는지만 확인하고 싶은 것이다.
 * 그렇다면 VideoCard 컴포넌트를 클릭해 VideoDetails 컴포넌트가 제대로 표시되는지까지 확인해야 할까?
 *
 * 아니다. 단위 테스트는 작은 단위. 여기선 VideoCard라는 컴포넌트가 주어진 역할을 잘 수행하는지만 확인하면 된다.
 * 내부에선 navigate 함수를 호출해 라우트를 변경하고, 비디오라는 상태를 함께 전송하기만 하면 된다.
 *
 * 그렇다면 연결된 VideoDetails에 대한 테스트는 필요 없고, 단순히 이 상태를 제대로 전달했는지, 그리고 라우트를 변경했는지만
 * 확인하면 된다. 그러니 별도의 디스플레이 컴포넌트를 간단히 만들어 테스트하면 된다.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoCard from "../VideoCard";
import { createRoutesStub, useLocation } from "react-router";
import { formatAgo } from "../../util/date";
import userEvent from "@testing-library/user-event";

describe("@src/components/VideoCard.jsx", () => {
  const video = {
    id: 1,
    snippet: {
      title: "title",
      channelId: "1",
      channelTitle: "channelTitle",
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: "http://image/",
        },
      },
    },
  };

  it("비디오 카드가 렌더링된다.", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <VideoCard video={video} />,
      },
    ]);

    render(<Stub />);

    const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

    const image = screen.getByRole("img");

    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("비디오 카드를 클릭하면 비디오 정보와 함께 상세 페이지로 이동한다.", async () => {
    function DisplayLocationState() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <VideoCard video={video} />,
      },
      {
        path: `videos/watch/${video.id}`,
        Component: DisplayLocationState,
      },
    ]);

    render(<Stub initialEntries={["/"]} />);

    await userEvent.click(screen.getByRole("listitem"));

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
