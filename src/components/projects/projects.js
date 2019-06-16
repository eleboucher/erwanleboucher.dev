import React from 'react'
import styled from 'styled-components/macro'
import { StaticQuery, graphql } from 'gatsby'
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
  align-self: stretch;
  background-color: var(--white);
  padding: 20px 20px;
  border-radius: 6px;
  color: var(--dark);
  grid-gap: 10px;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 0px 18px 0px;
`
const Name = styled.div`
  grid-area: title;
  display: flex;
  align-items: center;
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

  background-color: ${({ color }) => color};
  height: 14px;
  width: 14px;
`

const Topics = styled.div`
  grid-area: topics;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  > :not(:first-child) {
    margin-left: 5px;
  }
`

const Tags = styled.span`
  color: var(--primary);
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
                    repositoryTopics(first: 3) {
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
        <Pannel title="Projects">
          <Wrapper>
            {repos.map(({ node }) => (
              <Card key={node.name}>
                <Name>
                  <Repo alt="Repo" />
                  <StyledLink
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RepoName>{node.name}</RepoName>
                  </StyledLink>
                </Name>
                <Description>{node.shortDescriptionHTML}</Description>
                <Topics>
                  {node.repositoryTopics.edges.map(({ node }) => (
                    <div key={node.topic.name}>
                      <Tags as="span">{`#${node.topic.name}`}</Tags>
                    </div>
                  ))}
                </Topics>
                <Stats>
                  <LanguageRound color={node.primaryLanguage.color} />
                  <TopicName>{node.primaryLanguage.name}</TopicName>
                  <Star alt="star" />
                  <TopicName>{node.stargazers.totalCount}</TopicName>
                  <Forked alt="fork" />
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
