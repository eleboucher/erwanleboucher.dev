import React from 'react'

import Pannel from '../Pannel'
import styled from 'styled-components'
import { Text } from '../typography'

const calculateAge = () => {
  const birthday = new Date('1998-06-05')
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const Wrapper = styled.div`
  max-width: 700px;
  align-self: center;
`

const About = () => (
  <Pannel title="About Me">
    <Wrapper>
      <Text>
        Hi,
        <br /> I'm a {calculateAge()} year old Full-Stack developer living in
        Paris. Enthusiast about anything related to new technology, science or
        engineering. I'm as well interested by cars, especially Formula 1,
        Sci-fi and musics.
      </Text>
    </Wrapper>
  </Pannel>
)

export default About
