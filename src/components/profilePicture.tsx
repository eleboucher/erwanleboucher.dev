import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const Me = styled(Img)`
  border-radius: 100%;
  object-fit: contain;
`

const ProfilePicture = () => {
  const image = useStaticQuery(graphql`
    query {
      fileName: file(relativePath: { eq: "erwanleboucher.jpg" }) {
        childImageSharp {
          fixed(height: 200, width: 200, quality: 95) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  return <Me fixed={image.fileName.childImageSharp.fixed}></Me>
}

export default React.memo(ProfilePicture)
