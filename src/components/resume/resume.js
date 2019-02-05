import React from 'react'

import RawPannel from '../Pannel'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Download from '../../images/download.svg'

const Pannel = styled(RawPannel)`
  min-height: 75vh;
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
        <a href={file.publicURL} target="_blank" rel="noopener noreferrer">
          <img src={Download} height="100px" alt="download my resume" />
        </a>
      </Pannel>
    )}
  />
)

export default About
