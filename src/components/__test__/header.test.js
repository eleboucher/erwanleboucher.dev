import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Header from "../header"

describe("Header", () => {
  it("renders correctly", () => {
    const { container } = render(<Header siteTitle="Default Starter" />)
    expect(container.innerHTML).toMatchSnapshot()
  })
})
