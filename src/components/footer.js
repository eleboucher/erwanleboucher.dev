import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from './typography'

import Github from '../images/github-logo-black.svg'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: var(--white);

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

const Footer = () => (
  <Wrapper>
    <Item>
      <Text as="a">Find the Code on</Text>
      <a href="https://github.com/genesixx/erwanleboucher.fr">
        <Icon src={Github} alt="Github" />
      </a>
    </Item>
    <Item>
      <Text>® {new Date().getFullYear()} Erwan Leboucher</Text>
    </Item>
  </Wrapper>
)

export default Footer
