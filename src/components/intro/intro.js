import React from 'react'
import styled from 'styled-components/macro'

import Left from './left'
import Right from './right'
const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  justify-self: center;
  background-color: var(--primary);
  color: var(--white);

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    flex-direction: column;
    text-align: center;
  }
`

const Intro = () => (
  <Wrapper>
    <Left />
    <Right />
  </Wrapper>
)

export default Intro
