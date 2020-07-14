import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Index from "../index"

describe("Index", () => {
  it("renders correctly", () => {
    const { container } = render(<Index />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
