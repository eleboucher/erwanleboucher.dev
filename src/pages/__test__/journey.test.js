import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Journey from "../journey"

describe("Journey", () => {
  it("renders correctly", () => {
    const { container } = render(<Journey />)
    expect(container.innerHTML).toMatchSnapshot()
  })
})
