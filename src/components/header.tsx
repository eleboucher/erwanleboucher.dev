import { Link as RawLink } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import Divider from "./divider"

const HeaderWrapper = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const Title = styled(RawLink)`
  margin: 10px 0px;
  color: var(--dark);
  text-decoration: none;
  font-family: "Archivo Black", sans-serif;
  font-size: 36px;
`

const Navs = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  @media (max-width: 800px) {
    margin-right: 0px;
  }
`

const Link = styled(RawLink)`
  margin-right: 10px;
  text-decoration: none;
  font-family: "Archivo Black", sans-serif;
  font-weight: bold;
  color: var(--dark);
`

const Header = ({ siteTitle }) => (
  <header>
    <HeaderWrapper>
      <Link as={Title} to="/">
        {siteTitle}
      </Link>
      <Navs>
        <Link to="/">About</Link>
        <Link to="/journey">Journey</Link>
        <Link to="/projects">Projects</Link>
      </Navs>
    </HeaderWrapper>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
