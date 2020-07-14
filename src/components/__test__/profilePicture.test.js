import React from "react"
import { render } from "@testing-library/react"
import "jest-styled-components"

import ProfilePicture from "../profilePicture"

describe("ProfilePicture", () => {
  it("renders correctly", () => {
    const { container } = render(<ProfilePicture />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
