import React, { useState, useEffect } from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Intro from '../components/intro'
import TimeLine from '../components/timeline'
import Skills from '../components/skills'
import Resume from '../components/resume'
import { Center, Loading } from '../components/utils'
import Spinner from '../components/Spinner'
import Projects from '../components/projects'

const IndexPage = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <>
      {loading ? (
        <Loading>
          <Center>
            <Spinner />
          </Center>
        </Loading>
      ) : (
        <Layout>
          <SEO keywords={[`Erwan`, `Leboucher`, `Developer`, `FullStack`]} />
          <Intro />
          <Skills />
          <TimeLine />
          <Projects />
          <Resume />
        </Layout>
      )}
    </>
  )
}

export default IndexPage
