import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components/macro'
import Footer from './footer'
import './layout.css'

const Content = styled.div`
  width: 100%;
`

const breakpoint = {
  breakpoint: { XL: '1274px', L: '1024px', M: '900px', S: '700px' },
}

const Layout = ({ children }) => (
  <ThemeProvider theme={breakpoint}>
    <>
      <Content>{children}</Content>
      <Footer />
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
