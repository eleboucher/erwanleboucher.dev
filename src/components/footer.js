import React from 'react'
import styled from 'styled-components/macro'
import { Text } from './typography'

import Github from '../images/github-logo.svg'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: var(--primary);
  color: var(--white);
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`

const Icon = styled.img`
  height: 50px;
  margin-left: 5px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
`
const StyledLink = styled.a`
  align-self: center;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.2s linear;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

const Footer = () => (
  <Wrapper>
    <Item>
      <Text as="a">Find the Code on</Text>
      <StyledLink href="https://github.com/genesixx/erwanleboucher.fr">
        <Icon src={Github} alt="Github" />
      </StyledLink>
    </Item>
    <Item>
      <Text>® {new Date().getFullYear()} Erwan Leboucher</Text>
    </Item>
  </Wrapper>
)

export default Footer
