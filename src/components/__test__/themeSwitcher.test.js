import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "jest-styled-components"

import ThemeSwitcher from "../themeSwitcher"

describe("ThemeSwitcher", () => {
  it("renders correctly", () => {
    const { container } = render(<ThemeSwitcher />)
    expect(container.innerHTML).toMatchSnapshot()
  })

  it("it should be checked when pressed and theme has been changed", () => {
    const { getByTestId } = render(<ThemeSwitcher />)
    const checkbox = getByTestId("theme-checkbox")
    expect(checkbox.checked).toEqual(false)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toEqual(true)
    expect(document.documentElement.getAttribute("data-theme")).toEqual("dark")
  })
})
