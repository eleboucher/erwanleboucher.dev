import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import LinkedIn from "../images/linkedin.svg"
import Twitter from "../images/twitter.svg"
import Github from "../images/github.svg"
import Mail from "../images/mail.svg"

const Social = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`

export const StyledLink = styled.a`
  &:not(:first-child) {
    margin-left: 20px;
  }

  :hover {
    filter: grayscale(1);
  }

  > svg {
    color: var(--dark);
    height: ${props => props.size}px;
    transition: opacity 0.2s linear;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`

const Socials = ({ size }) => (
  <Social>
    <StyledLink
      href="https://github.com/genesixx"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Github"
      size={size}
    >
      <Github alt="GitHub" loading="lazy" />
    </StyledLink>
    <StyledLink
      href="https://www.linkedin.com/in/erwan-leboucher/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      size={size}
    >
      <LinkedIn alt="LinkedIn" loading="lazy" />
    </StyledLink>
    <StyledLink
      href="mailto:erwanleboucher@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Mail"
      size={size}
    >
      <Mail alt="Mail" loading="lazy" />
    </StyledLink>
    <StyledLink
      href="https://twitter.com/elebouch"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      size={size}
    >
      <Twitter alt="Twitter" loading="lazy" />
    </StyledLink>
  </Social>
)

Socials.propTypes = {
  size: PropTypes.number,
}

export default Socials
