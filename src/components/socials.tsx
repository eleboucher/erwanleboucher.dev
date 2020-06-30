import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import LinkedIn from "../images/linkedin.svg"
import Twitter from "../images/twitter.svg"
import Github from "../images/github.svg"
import Mail from "../images/mail.svg"
import Sourcerer from "../images/sourcerer.svg"
import Dribbble from "../images/dribbble.svg"

const Social = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  flex-wrap: wrap;
`

export const StyledLink = styled.a`
  :hover {
    filter: grayscale(1);
  }

  > svg {
    color: var(--dark);
    padding: 10px;
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
      href="https://github.com/eleboucher"
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
    <StyledLink
      href="https://sourcerer.io/eleboucher"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Sourcerer"
      size={size}
    >
      <Sourcerer alt="Sourcerer" loading="lazy" />
    </StyledLink>
    <StyledLink
      href="https://dribbble.com/eleboucher"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Sourcerer"
      size={size}
    >
      <Dribbble alt="Dribbble" loading="lazy" />
    </StyledLink>
  </Social>
)

Socials.propTypes = {
  size: PropTypes.number,
}

export default Socials
