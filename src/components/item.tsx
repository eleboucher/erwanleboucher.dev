import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 15px 0;
`
const Title = styled.p`
  font-size: 26px;
  margin: 0 0 5px 0;
`

const Description = styled.p`
  font-size: 14px;
  color: var(--primary);
  margin: 0 0 15px 0;
`

const Item = ({ title, description, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Description>{description}</Description>
    {children}
  </Wrapper>
)

Item.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
}

export default React.memo(Item)
