import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { NavBar } from '../../../components/NavBar'
import { PageWrapper } from '../../../components/PageWrapper'

import { Masthead } from './Masthead'
import { Features } from './Features'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper>
    </>
  )
}
