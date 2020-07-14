import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Section from "../section"

describe("Section", () => {
  it("renders correctly", () => {
    const { container } = render(<Section title="test" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
