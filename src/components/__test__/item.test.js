import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Item from "../item"

describe("Item", () => {
  it("renders correctly", () => {
    const { container } = render(<Item title="test" description="test" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
