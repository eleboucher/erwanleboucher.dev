import React from 'react'
import styled from 'styled-components/macro'
import { Text } from '../typography'

import Left from './left'
import Right from './right'
const Wrapper = styled.div`
  min-height: 98vh;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  justify-self: center;
  background-color: var(--primary);
  color: var(--white);

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    flex-direction: column;
    text-align: center;
  }
`
const About = styled.div`
  flex: 1 1 100%;
  width: 100%;
  > ${Text} {
    max-width: 700px;
    align-self: center;
    margin: auto;
  }
`
const calculateAge = () => {
  const birthday = new Date('1998-06-05')
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
const Intro = () => (
  <Wrapper>
    <Left />
    <Right />
    <About>
      <Text>
        I'm a {calculateAge()} year old Full-Stack developer living in Paris
        wanting to broaden new horizons. Enthusiast about anything related to
        new technologies, science or engineering, I am interested in cars,
        especially Formula 1, Sci-fi and music.
      </Text>
    </About>
  </Wrapper>
)

export default Intro
