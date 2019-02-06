import React from 'react'
import styled, { css } from 'styled-components'
import { SubTitle } from './typography'

const Pannel = styled.div`
  min-height: 90vh;

  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props =>
    props.primary &&
    css`
      background-color: var(--primary);
      color: var(--white);
    `};
`
Pannel.Body = styled.div`
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`
Pannel.Title = styled(SubTitle)``

const PannelComponent = ({ className, primary, title, children }) => (
  <Pannel className={className} primary={primary}>
    <Pannel.Title>{title}</Pannel.Title>
    <Pannel.Body>{children}</Pannel.Body>
  </Pannel>
)

export default PannelComponent
