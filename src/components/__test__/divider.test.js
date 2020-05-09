import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Divider from "../divider"

describe("Divider", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Divider />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
