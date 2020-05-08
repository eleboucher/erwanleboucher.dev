import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Divider from "./divider"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--dark);
`

const Title = styled.span`
  font-family: "Archivo Black", sans-serif;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
`

const Section = ({ children, title, ...props }) => (
  <SectionWrapper {...props}>
    <Divider />
    <Title>{title}</Title>
    {children}
  </SectionWrapper>
)

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
}

export default React.memo(Section)
