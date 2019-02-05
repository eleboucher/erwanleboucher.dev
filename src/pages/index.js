import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Intro from '../components/intro'
import About from '../components/about'
import TimeLine from '../components/timeline'
import Skills from '../components/skills'
const IndexPage = () => (
  <Layout>
    <SEO keywords={[`Erwan`, `Leboucher`, `Developer`, `FullStack`]} />
    <Intro />
    <About />
    <TimeLine />
    <Skills />
  </Layout>
)

export default IndexPage
