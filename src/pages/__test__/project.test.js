import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Projects from "../projects"

describe("Projects", () => {
  it("renders correctly", () => {
    const { container } = render(<Projects />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
