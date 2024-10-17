import React from "react"

import LinkedIn from "../images/linkedin.svg"
import Twitter from "../images/twitter.svg"
import Github from "../images/github.svg"
import Mail from "../images/mail.svg"
import Dribbble from "../images/dribbble.svg"

const StyledLink = ({ children, ...props }) => (
  <a {...props} className="hover:grayscale">
    {children}
  </a>
)

const Socials = ({ size }) => (
  <div className="flex flex-wrap m-3 items-center">
    <StyledLink
      href="https://github.com/eleboucher"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Github"
      size={size}
    >
      <Github
        alt="GitHub"
        loading="lazy"
        className="p-3 h-24 w-auto cursor-pointer transition-opacity hover:opacity-70"
      />
    </StyledLink>
    <StyledLink
      href="https://www.linkedin.com/in/erwan-leboucher/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      size={size}
    >
      <LinkedIn
        alt="LinkedIn"
        loading="lazy"
        className="p-3 h-24 w-auto cursor-pointer transition-opacity hover:opacity-70"
      />
    </StyledLink>
    <StyledLink
      href="mailto:erwanleboucher@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Mail"
      size={size}
    >
      <Mail
        alt="Mail"
        loading="lazy"
        className="p-3 h-24 w-auto cursor-pointer transition-opacity hover:opacity-70"
      />
    </StyledLink>
  </div>
)

export default Socials
