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
  :not(:first-of-type) {
    margin-left: 100px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.L}) {
    margin-left: 50px !important;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    margin-left: 20px !important;
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

const timeLineScript = [
  {
    date: '2016',
    link: 'https://www.st-jo.fr/',
    head: 'Lycée Saint Joseph Le Havre',
    text: 'Baccalauréat Scientifique',
  },
  {
    date: '2017-2019',
    link: 'https://www.42.fr/',
    head: 'Ecole 42',
    text: 'Computer Science',
  },
  {
    date: 'Oct 2018',
    link: 'https://navya.tech/press/navya-x-42-2',
    head: 'NAVYA X 42 First Place',
    text: 'Coding Contest',
  },
  {
    date: 'Nov 2018 - July 2019',
    link: 'https://gitguardian.com',
    head: 'GitGuardian',
    text: 'Full-Stack developer',
  },
  {
    date: 'Since Sep 2019',
    link: 'https://www.viacash.com',
    head: 'Barzahlen',
    text: 'Software Engineer',
  },
]

const TimeLineComponent = () => (
  <Pannel title="Journey" primary>
    <TimeLine>
      {timeLineScript.map(({ date, link, head, text }) => (
        <TimeLine.Info>
          <TimeLine.Date>{date}</TimeLine.Date>
          <TimeLine.Head
            as="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {head}
          </TimeLine.Head>
          <TimeLine.Text>{text}</TimeLine.Text>
        </TimeLine.Info>
      ))}
    </TimeLine>
  </Pannel>
)

export default TimeLineComponent
