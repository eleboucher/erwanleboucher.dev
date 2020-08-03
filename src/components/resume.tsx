import React from "react"
import { StyledLink } from "./socials"

import File from "../images/file.svg"

const Resume = ({ size }) => (
  <StyledLink
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="resume"
    size={size}
    style={{ marginLeft: 10 }}
  >
    <File alt="resume" loading="lazy" />
  </StyledLink>
)

export default Resume
