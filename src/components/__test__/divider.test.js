import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Divider from "../divider"

describe("Divider", () => {
  it("renders correctly", () => {
    const { container } = render(<Divider />)
    expect(container.innerHTML).toMatchSnapshot()
  })
})
