import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Socials from "../socials"

describe("Socials", () => {
  it("renders correctly", () => {
    const { container } = render(<Socials />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
