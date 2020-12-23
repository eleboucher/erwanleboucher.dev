import React from "react"
import styled from "styled-components"

import Section from "../components/section"
import SEO from "../components/seo"
import Socials from "../components/socials"
import ProfilePicture from "../components/profilePicture"
import Resume from "../components/resume"

const Image = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const IndexPage = () => (
  <article>
    <SEO title="Home" />
    <Section title="About">
      <Image>
        <ProfilePicture />
      </Image>
      <p>
        I am a French software developer, currently living in Berlin, Germany. I
        am a passionate developer, loving to write code in JavaScript, Go and
        Python, along with being curious about web-design and DevOps.
      </p>
      <p>
        Enthusiast about anything related to new technologies, science or
        engineering, I am as well interested in motorsport, especially Formula 1
        and Sci-fi.
      </p>
      <p>You can find me there:</p>
      <Socials size={50} />
      {/* <p>You can also find my resume bellow:</p>
      <Resume size={50} /> */}
    </Section>
  </article>
)

export default IndexPage
