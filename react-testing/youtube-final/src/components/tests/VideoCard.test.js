/**
 * VideoCard 컴포넌트의 동작을 테스트하고 싶다.
 *
 * 그럼 VideoCard의 동작을 먼저 생각해봐야 한다.
 *
 * 1. 전달된 video 인자를 사용해 화면에 렌더한다.
 * 2. 비디오 카드를 클릭했을 때, 비디오 id 경로로 라우트를 변경한다.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoCard from "../VideoCard";
import { createRoutesStub } from "react-router";
import { formatAgo } from "../../util/date";

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
});
