require("dotenv").config()
module.exports = {
  siteMetadata: {
    title: `Erwan Leboucher`,
    description: `French software developer, currently living in Berlin, Germany.`,
    author: `@eleboucher`,
    siteUrl: "https://erwanleboucher.dev",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
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
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`${__dirname}/src/components/layout.js`),
      },
    },
  ],
}
