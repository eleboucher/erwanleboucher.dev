import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <main className="h-full min-h-screen bg-white text-dark dark:text-white dark:bg-dark ">
      <div className="container md:w-2/3 py-10 mx-auto">
        <a className="skip-link" href="#maincontent">
          Skip to main
        </a>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="container">{children}</div>
      </div>
    </main>
  )
}

export default React.memo(Layout)
