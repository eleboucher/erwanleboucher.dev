import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Item from "../item"

describe("Item", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Item title="test" description="test" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
