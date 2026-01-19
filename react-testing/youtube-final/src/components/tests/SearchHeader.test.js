/**
 * 이번엔 검색 헤더를 테스트해보고 싶습니다..
 *
 * 우선 이 헤더의 목적을 정리해봅시다.
 *
 * 1. 사용자에게 입력 가능한 검색창을 표시한다.
 * 2. 사용자는 input 태그에 검색어를 입력할 수 있다.
 * 3. 사용자는 검색 버튼을 클릭해 /vidoes/${text}로 라우트를 변경할 수 있다.
 * 4. 파람으로 keyword를 입력 받았다면, 검색창에 키워드를 표시한다.
 *
 * 정도일 거 같네요..
 * 이번에도 마찬가지로 이 컴포넌트에 대한 단위 테스트를 하고 싶으니 다른 컴포넌트는 의존하지 않도록 테스트를 작성해봅시다.
 */

import { createRoutesStub, useParams } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchHeader from "../SearchHeader";

describe("@/src/components/SearchHeader.jsx", () => {
  it("검색 헤더가 렌더링된다.", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: SearchHeader,
      },
    ]);

    const { asFragment } = render(<Stub />);
    const firstRender = asFragment();

    expect(firstRender).toMatchSnapshot();
  });

  it("키워드가 입력창에 표시된다.", () => {
    const Stub = createRoutesStub([
      {
        path: "/:keyword",
        Component: SearchHeader,
      },
    ]);

    render(<Stub initialEntries={["/jimin"]} />);

    expect(screen.getByDisplayValue("jimin")).toBeInTheDocument();
  });

  it("검색어 입력 후 버튼을 클릭하면 결과 페이지로 이동한다.", async () => {
    const keyword = "jimin";
    const user = userEvent.setup();

    function DisplayKeyword() {
      return <p>{useParams().keyword}</p>;
    }

    const Stub = createRoutesStub([
      {
        path: "/",
        Component: SearchHeader,
      },
      {
        path: `/videos/:keyword`,
        Component: DisplayKeyword,
      },
    ]);

    render(<Stub initialEntries={["/"]} />);

    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");

    await user.type(searchInput, keyword);
    await user.click(searchButton);

    expect(screen.getByText(keyword));
  });
});
