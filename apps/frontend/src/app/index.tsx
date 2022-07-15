import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graph" element={<StructuralGraphPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  )
}
