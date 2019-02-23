import styled from 'styled-components/macro'

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #e9eae6;
  animation: spin 1s linear infinite;
  -webkit-animation: spin 1s linear infinite;
  align-self: center;
  justify-self: center;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`

export default Spinner
