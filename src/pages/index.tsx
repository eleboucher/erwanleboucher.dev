import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
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
  <Layout>
    <SEO title="Home" />
    <Section title="About">
      <Image>
        <ProfilePicture />
      </Image>
      <p>
        I'm a French software developer, currently living in Berlin, Germany.
        I'm a passionate developer and love writing code in Javascript, Go or
        Python.
      </p>
      <p>
        Enthusiast about anything related to new technologies, science or
        engineering, I am interested in cars, especially Formula 1 and Sci-fi.
      </p>
      <p>You can find me there:</p>
      <Socials size={50} />
      <p>You can also find my resume bellow:</p>
      <Resume />
    </Section>
  </Layout>
)

export default IndexPage
