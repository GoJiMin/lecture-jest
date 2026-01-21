import { createRoutesStub } from "react-router";
import NotFound from "../NotFound";
import { render, screen } from "@testing-library/react";

describe("@/src/pages/NotFound.jsx", () => {
  it("컴포넌트가 렌더링된다.", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: NotFound,
      },
    ]);

    const { asFragment } = render(<Stub />);

    expect(screen.getByText("Not Found!")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
