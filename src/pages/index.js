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
          I am a French software developer, currently living in Berlin, Germany.
          I am a passionate developer, loving to write code in JavaScript, Go
          and Python, along with being curious about web-design and DevOps.
        </p>
        <p className="my-3">
          Enthusiast about anything related to new technologies, science or
          engineering, I am as well interested in motorsport, especially Formula
          1 and Sci-fi.
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
