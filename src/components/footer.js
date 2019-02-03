import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from './typography'

import Github from '../images/github-logo-black.svg'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`

const Icon = styled.img`
  height: 50px;
  margin-left: 5px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
`

const Footer = () => (
  <Wrapper>
    <Item>
      <Text>Find the Code on Github</Text>
      <a href="https://github.com/genesixx/erwanleboucher.fr">
        <Icon src={Github} />
      </a>
    </Item>
    <Item>
      <Text>® {new Date().getFullYear()} Erwan Leboucher</Text>
    </Item>
  </Wrapper>
)

export default Footer
