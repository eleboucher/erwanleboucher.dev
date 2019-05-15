import React, { useState, useEffect, memo } from 'react'
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'

import useInView from '../hooks/useInView'
import { SubTitle } from './typography'

const Pannel = styled.div`
  min-height: 90vh;

  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  ${props =>
    props.primary &&
    css`
      background-color: var(--primary);
      color: var(--white);
    `};
`
Pannel.Body = styled(animated.div)`
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`
Pannel.Title = styled(SubTitle)``

const PannelComponent = ({ className, primary, title, children }) => {
  const [hasViewed, setHasViewed] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.3 })
  useEffect(() => {
    if (inView) {
      setHasViewed(true)
    }
  }, [!inView])

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: hasViewed ? 1 : 0 },
  })

  return (
    <Pannel className={className} ref={ref} primary={primary}>
      <Pannel.Title as={animated.span} style={props}>
        {title}
      </Pannel.Title>
      <Pannel.Body style={props}>{children}</Pannel.Body>
    </Pannel>
  )
}

export default memo(PannelComponent)
