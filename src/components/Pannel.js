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
Pannel.Body = styled.div`
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`
Pannel.Title = styled(SubTitle)``

const PannelComponent = ({ className, primary, title, children }) => {
  const [hasViewed, setHasViewed] = useState(false)
  const [ref, inView] = useInView({})
  useEffect(() => {
    if (inView) {
      setHasViewed(true)
    }
  }, [!inView])

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: hasViewed ? 1 : 0 },
    delay: 300,
  })

  return (
    <Pannel className={className} ref={ref} primary={primary}>
      <animated.div style={props}>
        <Pannel.Title>{title}</Pannel.Title>
        <Pannel.Body>{children}</Pannel.Body>
      </animated.div>
    </Pannel>
  )
}

export default memo(PannelComponent)
