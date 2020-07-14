import React from "react"
import styled from "styled-components"

const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: var(--dark);
  margin: 10px 0;
  animation: reveal 0.7s forwards;
  @keyframes reveal {
    from {
      clip-path: inset(0 0 0 100%);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
`

export default Divider
