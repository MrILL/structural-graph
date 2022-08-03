import * as React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'

import { StructuralGraph } from './components/StructuralGraph'

export function StructuralGraphPage() {
  return (
    <>
      <Helmet>
        <title>Graph Page</title>
      </Helmet>
      <PageWrapper>
        <Wrapper>
          <DebugDataBlock>cock1 cock2</DebugDataBlock>
          <StructuralGraph />
        </Wrapper>
      </PageWrapper>
    </>
  )
}

const DebugDataBlock = styled.div`
  width: 20%;
  min-width: 150px;
  background-color: #a39e9ee6;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`
