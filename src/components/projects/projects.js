import React from 'react'
import styled, { css } from 'styled-components/macro'
import { StaticQuery, graphql } from 'gatsby'
import { Text } from '../typography'
import Pannel from '../Pannel'

import Repo from '../../images/repo.svg'
import Forked from '../../images/repo-forked.svg'
import Star from '../../images/star.svg'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;

  align-items: center;
  grid-gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoint.M}) and (max-width: ${({
      theme,
    }) => theme.breakpoint.XL}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.M}) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Card = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas: 'title' 'description' 'topics' 'stats';

  background-color: var(--white);
  padding: 20px 20px;
  border-radius: 8px;
  color: var(--dark);
  grid-gap: 10px;
`
const Name = styled.div`
  grid-area: title;
  align-self: center;
`

const RepoName = styled.span`
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
`

const Description = styled.span`
  grid-area: description;
  font-size: 16px;
  align-self: center;
`

const StyledLink = styled.a`
  display: flex;
  align-self: center;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.2s linear;
  color: unset;
  &:hover {
    opacity: 0.7;
  }
`

const Stats = styled.div`
  grid-area: stats;
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 10px;
  }
`

const LanguageRound = styled.div`
  align-self: center;
  border-radius: 100%;

  background-color: ${props => props.color};
  height: 14px;
  width: 14px;
`

const Topics = styled.div`
  grid-area: topics;
  display: flex;
  align-items: flex-end;
  > :not(:first-child) {
    margin-left: 5px;
  }
`

const TopicName = styled.span`
  font-size: 16px;
`

const Projects = () => (
  <StaticQuery
    query={graphql`
      {
        github {
          user(login: "genesixx") {
            repositories(
              first: 6
              orderBy: { field: STARGAZERS, direction: DESC }
              privacy: PUBLIC
              isFork: false
              ownerAffiliations: OWNER
            ) {
              edges {
                node {
                  ... on GitHub_Repository {
                    name
                    shortDescriptionHTML
                    url
                    primaryLanguage {
                      color
                      name
                    }
                    repositoryTopics(first: 4) {
                      edges {
                        node {
                          topic {
                            name
                          }
                          url
                        }
                      }
                    }
                    stargazers {
                      totalCount
                    }
                    forks {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ github }) => {
      const repos = github.user.repositories.edges
      return (
        <Pannel title="Projects" primary>
          <Wrapper>
            {repos.map(({ node }) => (
              <Card key={node.name}>
                <Name>
                  <StyledLink href={node.url}>
                    <img src={Repo} />
                    <RepoName>{node.name}</RepoName>
                  </StyledLink>
                </Name>
                <Description>{node.shortDescriptionHTML}</Description>
                <Topics>
                  {node.repositoryTopics.edges.map(({ node }) => (
                    <div key={node.topic.name}>
                      <StyledLink
                        href={node.url}
                        css={css`
                          color: var(--lightAccent);
                        `}
                      >{`#${node.topic.name}`}</StyledLink>
                    </div>
                  ))}
                </Topics>
                <Stats>
                  <LanguageRound color={node.primaryLanguage.color} />
                  <TopicName>{node.primaryLanguage.name}</TopicName>
                  <img src={Star} />
                  <TopicName>{node.stargazers.totalCount}</TopicName>
                  <img src={Forked} />
                  <TopicName>{node.forks.totalCount}</TopicName>
                </Stats>
              </Card>
            ))}
          </Wrapper>
        </Pannel>
      )
    }}
  />
)

export default Projects
