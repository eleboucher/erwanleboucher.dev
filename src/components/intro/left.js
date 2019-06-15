import React from 'react'
import styled from 'styled-components/macro'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

const Me = styled(Img)`
  border-radius: 100%;
  object-fit: contain;
`
const Wrapper = styled.div`
  align-self: center;
`

const Left = () => (
  <StaticQuery
    query={graphql`
      {
        me: file(relativePath: { eq: "erwanleboucher.jpg" }) {
          childImageSharp {
            fixed(height: 200, width: 200) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Me fixed={data.me.childImageSharp.fixed} alt="me" />
      </Wrapper>
    )}
  />
)

export default Left
