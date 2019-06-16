import React from 'react'

import RawPannel from '../Pannel'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components/macro'
import Download from '../../images/download.svg'
import { Text as RawText } from '../typography'

const Pannel = styled(RawPannel)`
  min-height: 50vh;
`
const Text = styled(RawText)`
  font-weight: bold;
`
const StyledLink = styled.a`
  align-self: center;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.2s linear;
  cursor: pointer;
  color: var(--white);

  &:hover {
    opacity: 0.7;
  }
`

const About = () => (
  <StaticQuery
    query={graphql`
      {
        file(name: { eq: "resume" }) {
          publicURL
        }
      }
    `}
    render={({ file }) => (
      <Pannel title="Download my resume" primary>
        <StyledLink
          href={file.publicURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download height={100} alt="download my resume" />
          <Text>Download Here</Text>
        </StyledLink>
      </Pannel>
    )}
  />
)

export default About
