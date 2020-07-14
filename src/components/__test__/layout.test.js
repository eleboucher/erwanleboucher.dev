import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Layout from "../layout"

describe("Layout", () => {
  it("renders correctly", () => {
    const { container } = render(<Layout />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
