import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Blog from "../blog"

describe("Blog", () => {
  it("renders correctly", () => {
    const { container } = render(<Blog />)
    expect(container.innerHTML).toMatchSnapshot()
  })
})
