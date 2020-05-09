import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { StyledLink } from "./socials"

import File from "../images/file.svg"

const Resume = ({ size }) => {
  const resume = useStaticQuery(graphql`
    {
      file(name: { eq: "resume" }) {
        publicURL
      }
    }
  `)

  return (
    <StyledLink
      href={resume.file.publicURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="resume"
      size={size}
      style={{ marginLeft: 10 }}
    >
      <File alt="resume" loading="lazy" />
    </StyledLink>
  )
}

export default Resume
