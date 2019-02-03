module.exports = {
  siteMetadata: {
    title: `Erwan Leboucher`,
    description: `French Full-Stack Developer`,
    author: `@elebouch`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Erwan Leboucher`,
        short_name: `elebouch`,
        start_url: `/`,
        background_color: `#e9eae6`,
        theme_color: `#33375b`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
        include_favicon: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}
