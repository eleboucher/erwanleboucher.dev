import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import ThemeSwitcher from "../themeSwitcher"

describe("ThemeSwitcher", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ThemeSwitcher />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
