import React from "react"
import renderer from "react-test-renderer"
import Socials from "../socials"

describe("Socials", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Socials />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
