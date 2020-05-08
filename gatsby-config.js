require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Erwan Leboucher`,
    description: `French Full-Stack Developer`,
    author: `@elebouch`,
    siteUrl: "https://erwanleboucher.dev",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Questrial`,
          },
          {
            family: `Archivo Black`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        refetchInterval: 1800,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/, // See below to configure properly
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Erwan Leboucher`,
        short_name: `elebouch`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#2C4251`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
        include_favicon: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
