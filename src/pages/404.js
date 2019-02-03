import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Title, Text } from '../components/typography'
const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Title>NOT FOUND</Title>
    <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
  </Layout>
)

export default NotFoundPage
