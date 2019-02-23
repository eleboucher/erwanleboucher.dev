import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Footer from './footer'
import './layout.css'

const Content = styled.div`
  width: 100%;
`

const Layout = ({ children }) => (
  <>
    <Content>{children}</Content>
    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
