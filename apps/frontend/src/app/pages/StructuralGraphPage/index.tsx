import * as React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

import { StructuralGraph } from './components/StructuralGraph'

export function StructuralGraphPage() {
  const [events, setEvents] = React.useState([])

  React.useEffect(() => {
    // const interval = setInterval(() => {
    axios
      .get('http://127.0.0.1:3000/api/events')
      .then(res => res.data)
      .then(data => {
        setEvents(data)
      })
      .catch(e => console.log(e))
    // }, 5000)
    // return () => clearInterval(interval)
  }, [])
  console.log('Page redraw')

  return (
    <>
      <Helmet>
        <title>Graph Page</title>
      </Helmet>
      <PageWrapper>
        <Wrapper>
          <DebugDataBlock>cock1 cock2</DebugDataBlock>
          <StructuralGraph serverEvents={events} />
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
