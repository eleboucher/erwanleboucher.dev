import React from 'react'

import Pannel from '../Pannel'
import { Text } from '../typography'

const calculateAge = () => {
  const birthday = new Date('1998-06-05')
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const About = () => (
  <Pannel title="About Me">
    <Text>
      Hi,
      <br /> I'm a {calculateAge()} year old Full-Stack developer living in
      Paris. Enthusiast about anything related to new technology, science or
      engineering.
    </Text>
  </Pannel>
)

export default About
