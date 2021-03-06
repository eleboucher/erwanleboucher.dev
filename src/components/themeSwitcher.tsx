import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
  memo,
} from "react"
import styled from "styled-components"

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: var(--white);
  transition: background-color 0.3s ease-in;
  border-radius: 20px;
  border: 2px solid var(--primary);
  cursor: pointer;

  ::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fad21c;
    top: 1px;
    left: 2px;

    transition: all 0.3s;
  }
`

const Input = styled.input`
  display: none;

  :checked + ${Label}::after {
    background-color: transparent;
    box-shadow: 5px 5px 0 0 var(--dark);
    left: 13px;
    transform: rotate(-45deg);
  }

  :checked + ${Label} {
    background-color: #000;
    border: 2px solid var(--dark);

    transition: background-color 0.3s ease-in;
  }
`

const useThemeSwitcher = (
  initialState: boolean = false
): [boolean, ChangeEventHandler<HTMLInputElement>] => {
  const [enabled, setEnabled] = useState(initialState)

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme)

      if (currentTheme === "dark") {
        setEnabled(true)
      }
    }
  }, [])

  const onChange = useCallback(e => {
    setEnabled(e.target.checked)

    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }, [])

  return [enabled, onChange]
}

const ThemeSwitcher = () => {
  const [enabled, onChange] = useThemeSwitcher()

  return (
    <>
      <Input
        type="checkbox"
        id="switch"
        checked={enabled}
        onChange={onChange}
        data-testid="theme-checkbox"
      />
      <Label htmlFor="switch"></Label>
    </>
  )
}

export default memo(ThemeSwitcher)
