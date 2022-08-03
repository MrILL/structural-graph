import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import { GlobalStyle } from '../styles/global-styles'
import { HomePage } from './pages/HomePage/Loadable'
import { StructuralGraphPage } from './pages/StructuralGraphPage'
import { NotFoundPage } from './pages/NotFoundPage/Loadable'
// import { useTranslation } from 'react-i18next';

export function App() {
  // const { i18n } = useTranslation();

  //TODO fix forceRefresh=true
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        // htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <PageWrapper>
        <HeaderWrapper>
          <ul style={{ borderBottom: 'solid 1px' }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/graph">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </HeaderWrapper>

        <ContentWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/graph" element={<StructuralGraphPage />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </ContentWrapper>

        {/* <FooterWrapper>cock</FooterWrapper> */}
      </PageWrapper>
      <GlobalStyle />
    </BrowserRouter>
  )
}

// const FooterWrapper = styled.div`
//   flex: 0 1 1px;
// `

const ContentWrapper = styled.div`
  flex: 1 1 auto;
`

const HeaderWrapper = styled.div`
  flex: 0 1 auto;
`

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`
