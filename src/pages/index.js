import React from "react"

import Section from "../components/section"
import SEO from "../components/seo"
import Socials from "../components/social"
import ProfilePicture from "../components/profilePicture"

const IndexPage = () => {
  return (
    <article>
      <SEO title="Home" />
      <Section title="About">
        <div className="flex justify-center mb-5">
          <ProfilePicture />
        </div>
        <p className="my-3">
          Backend-focused Software Engineer with 5+ years of experience in
          building scalable, high-performance applications. Expert in Golang,
          Python, and database optimization, processing 500M+ daily records in a
          matter of seconds. Skilled in implementing real-time services with
          millisecond response times. Adept at optimizing complex systems,
          implementing real-time services with millisecond response times, and
          leveraging cloud technologies to enhance data processing capabilities
          and overall system performance.
        </p>
        <p>You can find me there:</p>
        <Socials />
        {/* <p>You can also find my resume bellow:</p>
      <Resume size={50} /> */}
      </Section>
    </article>
  )
}

export default IndexPage
