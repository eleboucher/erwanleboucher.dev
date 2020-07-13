import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import NotFound from "../404"

describe("NotFound", () => {
  it("renders correctly", () => {
    const { container } = render(<NotFound />)
    expect(container.innerHTML).toMatchSnapshot()
  })
})
