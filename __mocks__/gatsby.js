const React = require("react")
const gatsby = jest.requireActual("gatsby")
module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(() => ({
    site: {
      siteMetadata: {
        author: "test",
        description: "test",
        title: "test",
      },
    },
    file: {
      publicURL: "test",
    },
    fileName: {
      childImageSharp: {
        fixed: "test",
      },
    },
    github: {
      user: {
        pinnedItems: {
          edges: [
            {
              node: {
                __typename: "GitHub_Repository",
                name: "erwanleboucher.dev",
                description:
                  "Personal Website using the GatsbyJS. Minimalistic website to display my journey as a software developer.",
                url: "https://github.com/eleboucher/erwanleboucher.dev",
                languages: {
                  edges: [
                    { node: { name: "JavaScript" } },
                    { node: { name: "CSS" } },
                    { node: { name: "HTML" } },
                    { node: { name: "TypeScript" } },
                  ],
                  totalCount: 4,
                },
                repositoryTopics: {
                  edges: [
                    {
                      node: {
                        topic: { name: "portfolio" },
                        url: "https://github.com/topics/portfolio",
                      },
                    },
                    {
                      node: {
                        topic: { name: "gatsby" },
                        url: "https://github.com/topics/gatsby",
                      },
                    },
                    {
                      node: {
                        topic: { name: "styled-components" },
                        url: "https://github.com/topics/styled-components",
                      },
                    },
                  ],
                },
                stargazers: { totalCount: 3 },
                forks: { totalCount: 0 },
              },
            },
          ],
        },
      },
    },
  })),
}
