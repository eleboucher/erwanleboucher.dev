import React from 'react'
import styled from 'styled-components/macro'
import { Title, Text as RawText } from '../typography'

import LinkedIn from '../../images/linkedin-logo.svg'
import Twitter from '../../images/twitter-logo.svg'
import Github from '../../images/github-logo.svg'
import Mail from '../../images/mail.svg'
const Wrapper = styled.div`
  margin-left: 20px;
  align-self: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    margin-left: 0;
    justify-content: center;
  }
`

const Social = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    justify-content: center;
  }
`
Social.Link = styled.a`
  &:not(:first-child) {
    margin-left: 10px;
  }
  :hover {
    filter: grayscale(1);
  }
  > svg {
    height: 50px;

    transition: opacity 0.2s linear;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`
const Text = styled(RawText)`
  font-size: 24px;
`

const Right = () => (
  <Wrapper>
    <Title>Erwan Leboucher</Title>
    <Text>Full-Stack Developer</Text>
    <Social>
      <Social.Link
        href="mailto:erwanleboucher@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Mail"
      >
        <Mail alt="Mail" />
      </Social.Link>
      <Social.Link
        href="https://github.com/genesixx"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github"
      >
        <Github alt="GitHub" />
      </Social.Link>
      <Social.Link
        href="https://www.linkedin.com/in/erwan-leboucher/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedIn alt="LinkedIn" />
      </Social.Link>
      <Social.Link
        href="https://twitter.com/elebouch"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <Twitter alt="Twitter" />
      </Social.Link>
    </Social>
  </Wrapper>
)

export default Right
