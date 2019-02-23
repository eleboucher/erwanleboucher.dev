import React from 'react'
import styled from 'styled-components/macro'
import { Text, SubTitle } from '../typography'
import Pannel from '../Pannel'

const Skills = styled.div``

Skills.Cat = styled(SubTitle)`
  font-size: 20px;
  margin-left: 1em;
`

Skills.List = styled.ul``

Skills.Item = styled.li`
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.8px;
`

const Wrapper = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const SkillsComponent = () => (
  <Pannel title="Skills">
    <Wrapper>
      <Skills>
        <Skills.Cat>Developer Skills</Skills.Cat>
        <Skills.List>
          <Skills.Item>
            <strong>Languages:</strong> C, Java, JavaScript, Python, Go
          </Skills.Item>
          <Skills.Item>
            <strong>Web:</strong> HTML/CSS, PHP
          </Skills.Item>
          <Skills.Item>
            <strong>Frameworks:</strong> NodeJs, Express, React, React Native,
            Mux, Flask
          </Skills.Item>
          <Skills.Item>
            <strong>Databases:</strong> MySQL, PostgreSQL, MongoDB
          </Skills.Item>
          <Skills.Item>
            <strong>Scripts:</strong> Bash, Python
          </Skills.Item>
        </Skills.List>
      </Skills>
      <Skills>
        <Skills.Cat>Tool Skills</Skills.Cat>
        <Skills.List>
          <Skills.Item>
            <strong>Versioning:</strong> Git
          </Skills.Item>
          <Skills.Item>
            <strong>Platforms:</strong> Mac, Linux
          </Skills.Item>
          <Skills.Item>
            <strong>Hosting Services:</strong> AWS, Digital Ocean, Heroku
          </Skills.Item>
          <Skills.Item>
            <strong>DevOps:</strong> Docker, Gitlab-CI
          </Skills.Item>
        </Skills.List>
      </Skills>
    </Wrapper>
  </Pannel>
)

export default SkillsComponent
