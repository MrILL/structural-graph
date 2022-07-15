import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '../../../components/PageWrapper'

import { StructuralGraph } from './components/StructuralGraph'

export function StructuralGraphPage() {
  return (
    <>
      <Helmet>
        <title>Graph Page</title>
      </Helmet>
      <PageWrapper>
        <div style={{ color: 'pink' }}>Cock</div>
        <StructuralGraph />
      </PageWrapper>
    </>
  )
}
