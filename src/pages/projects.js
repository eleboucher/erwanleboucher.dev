import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Section from "../components/section"
import SEO from "../components/seo"
import Item from "../components/item"

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
      title={<a href={project.url}>{project.name}</a>}
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
        <a
          href="https://github.com/eleboucher"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          style={{ marginTop: 30, fontWeight: "bold" }}
        >
          More on Github
        </a>
      </Section>
    </article>
  )
}

const githubQuery = graphql`
  {
    github {
      user(login: "eleboucher") {
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
