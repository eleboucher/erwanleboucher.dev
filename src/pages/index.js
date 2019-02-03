import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Intro from '../components/intro/intro'
import About from '../components/about/about'
import TimeLine from '../components/timeline/timeline'
import Skills from '../components/skills/skills'
const IndexPage = () => (
  <Layout>
    <SEO title="Index" keywords={[`gatsby`, `application`, `react`]} />
    <Intro />
    <About />
    <TimeLine />
    <Skills />
  </Layout>
)

export default IndexPage
