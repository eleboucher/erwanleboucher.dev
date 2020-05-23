import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Section from "../components/section"
import SEO from "../components/seo"
import Item from "../components/item"

const Link = styled.a`
  color: inherit;
`

const ProjectsItem = ({ project }) => {
  const formattedLanguages = project.languages?.edges?.map((edges, index) => {
    const language = edges?.node.name
    if (project.languages?.edges.length === 1) return `(${language})`
    switch (index) {
      case 0:
        return `(${language}, `
      case project.languages?.edges.length - 1:
        return `${language})`
      default:
        return `${language}, `
    }
  })

  return (
    <Item
      title={<Link href={project.url}>{project.name}</Link>}
      description={`stars: ${project.stargazers.totalCount} | forks:
          ${project.forks.totalCount}`}
    >
      <p>{project.description}</p>
      <span>{formattedLanguages}</span>
    </Item>
  )
}

const ProjectsPage = () => {
  const query = useStaticQuery(githubQuery)

  const repos = query?.github.user?.pinnedItems?.edges

  const ProjectsItems = repos?.map(({ node }) => (
    <ProjectsItem project={node} key={node.name} />
  ))

  return (
    <article>
      <SEO title="Projects" />
      <Section title="Projects">
        {ProjectsItems}
        <Link
          href="https://github.com/genesixx"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          style={{ marginTop: 30, fontWeight: "bold" }}
        >
          More on Github
        </Link>
      </Section>
    </article>
  )
}

const githubQuery = graphql`
  {
    github {
      user(login: "genesixx") {
        pinnedItems(first: 10) {
          edges {
            node {
              ... on GitHub_Repository {
                name
                description
                url
                languages(first: 6) {
                  edges {
                    node {
                      name
                    }
                  }
                  totalCount
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
`

export default ProjectsPage
