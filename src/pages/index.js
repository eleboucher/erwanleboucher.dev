import React, { useState, useEffect } from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Intro from '../components/intro'
import About from '../components/about'
import TimeLine from '../components/timeline'
import Skills from '../components/skills'
import Resume from '../components/resume'
import { Center, Loading } from '../components/utils'
import Spinner from '../components/Spinner'

const IndexPage = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 200)
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
          <About />
          <TimeLine />
          <Skills />
          <Resume />
        </Layout>
      )}
    </>
  )
}

export default IndexPage
