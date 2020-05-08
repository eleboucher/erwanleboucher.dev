import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { StyledLink } from "./socials"

import File from "../images/file.svg"

const Resume = () => {
  const resume = useStaticQuery(graphql`
    {
      file(name: { eq: "resume" }) {
        publicURL
      }
    }
  `)

  return (
    <StyledLink
      href={resume.publicURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="resume"
      size={50}
    >
      <File alt="resume" />
    </StyledLink>
  )
}

export default Resume
