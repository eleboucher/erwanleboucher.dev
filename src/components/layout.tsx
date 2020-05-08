/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;

  @media (max-width: 800px) {
    margin: 0;
  }
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: 20px 10px;

  @media (max-width: 800px) {
    margin: 0;
  }

  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Layout = ({ children, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Container {...props}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(Layout)
