/**
 * Asynchronously loads the component for HomePage
 */

import * as React from 'react'
import { lazyLoad } from '../../../utils/loadable'
import { LoadingIndicator } from '../../../components/LoadingIndicator'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HomePage = () => {
  return (
    <>
      <Link style={{ color: 'white' }} to="/">
        Home
      </Link>
      <Link style={{ color: 'white' }} to="/graph">
        Graph
      </Link>
    </>
  )
}

// export const HomePage = lazyLoad(
//   () => import('./index'),
//   module => module.HomePage,
//   {
//     fallback: (
//       <LoadingWrapper>
//         <LoadingIndicator />
//       </LoadingWrapper>
//     ),
//   },
// )
