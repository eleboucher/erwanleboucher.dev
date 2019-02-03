import React from 'react'
import styled from 'styled-components'
import { Text } from './typography'

const Wrapper = styled.div`
  display: flex;
`

const Footer = () => (
  <Wrapper>
    <Text>® {new Date().getFullYear()} Erwan Leboucher</Text>
  </Wrapper>
)

export default Footer
