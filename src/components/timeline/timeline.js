import React from 'react'
import styled from 'styled-components/macro'
import { Text } from '../typography'
import Pannel from '../Pannel'

const TimeLine = styled.div`
  display: flex;
  width: 100%;

  padding-bottom: 20px;
  border-bottom: 5px solid var(--white);
  position: relative;
  word-break: break-word;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    border-bottom: none;
    border-left: 5px solid var(--white);
    flex-direction: column;
    margin-left: 20px;
  }
`

TimeLine.Info = styled.div`
  margin-left: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoint.L}) {
    margin-left: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    margin-left: 20px;
    margin-top: 30px;
  }
`

TimeLine.Head = styled.span`
  text-decoration: none;
  color: var(--white);
  font-weight: bold;

  transition: 0.3s linear;

  &:hover {
    color: var(--lightAccent);
  }

  &::before {
    content: '';
    width: 25px;
    height: 25px;
    background-color: var(--lightAccent);
    border-radius: 25px;
    position: absolute;
    bottom: -20px;
    border: 5px solid var(--primary);
    @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
      bottom: unset;
      left: -20px;
    }
  }
`
TimeLine.Text = styled(Text)`
  font-size: 14px;
  margin-top: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    margin: 0px;
  }
`

TimeLine.Date = styled.h4`
  margin-bottom: 10px;
  font-weight: 300;

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    margin: 0px;
  }
`

const TimeLineComponent = () => (
  <Pannel title="My Journey" primary>
    <TimeLine>
      <TimeLine.Info>
        <TimeLine.Date>2016</TimeLine.Date>
        <TimeLine.Head as="a" href="https://www.st-jo.fr/">
          Lycée Saint Joseph Le Havre
        </TimeLine.Head>
        <TimeLine.Text>Baccalauréat Scientifique</TimeLine.Text>
      </TimeLine.Info>
      <TimeLine.Info>
        <TimeLine.Date>Since Nov 2017</TimeLine.Date>
        <TimeLine.Head as="a" href="https://www.42.fr/">
          Ecole 42
        </TimeLine.Head>
        <TimeLine.Text>Computer Science</TimeLine.Text>
      </TimeLine.Info>
      <TimeLine.Info>
        <TimeLine.Date>Oct 2018</TimeLine.Date>
        <TimeLine.Head as="a" href="https://navya.tech/press/navya-x-42-2">
          NAVYA X 42 First Place
        </TimeLine.Head>
        <TimeLine.Text>Coding Contest</TimeLine.Text>
      </TimeLine.Info>
      <TimeLine.Info>
        <TimeLine.Date>Nov 2018 - May 2019</TimeLine.Date>
        <TimeLine.Head as="a" href="https://gitguardian.com">
          Git Guardian
        </TimeLine.Head>
        <TimeLine.Text>Full-Stack intern developer</TimeLine.Text>
      </TimeLine.Info>
    </TimeLine>
  </Pannel>
)

export default TimeLineComponent
