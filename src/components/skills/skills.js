import React from 'react'
import styled from 'styled-components/macro'
import Pannel from '../Pannel'

const Skills = styled.div``

Skills.List = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 1em;
  text-indent: -1em;
`

Skills.Item = styled.li`
  font-size: 18px;
  line-height: 40px;
  letter-spacing: 0.8px;
`

const Wrapper = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoint.S}) {
    flex-direction: column;
  }
`

const SkillsComponent = () => (
  <Pannel title="Skills">
    <Wrapper>
      <Skills>
        <Skills.List>
          <Skills.Item>
            <strong>Languages:</strong> JavaScript, Python, Go, C, Java
          </Skills.Item>
          <Skills.Item>
            <strong>Web:</strong> HTML/CSS, PHP, REST API, GraphQL
          </Skills.Item>
          <Skills.Item>
            <strong>Frameworks:</strong> Express, React, React Native, Vue,
            Flask, Django
          </Skills.Item>
          <Skills.Item>
            <strong>Databases:</strong> MySQL, PostgreSQL, MongoDB
          </Skills.Item>
          <Skills.Item>
            <strong>Hosting Services:</strong> AWS, Digital Ocean, Heroku
          </Skills.Item>
          <Skills.Item>
            <strong>DevOps:</strong> Docker, Gitlab-CI, Travis-CI
          </Skills.Item>
        </Skills.List>
      </Skills>
    </Wrapper>
  </Pannel>
)

export default SkillsComponent
