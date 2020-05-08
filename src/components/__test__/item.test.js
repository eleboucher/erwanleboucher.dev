import React from "react"
import renderer from "react-test-renderer"
import Item from "../item"

describe("Item", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Item title="test" description="test" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
