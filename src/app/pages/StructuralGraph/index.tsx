import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from 'app/components/PageWrapper'
import { EvenCard } from './components/EventCard'
import { GameEvent } from 'types'

const data: GameEvent[] = [
  {
    wikiUrl: 'https://lessonsinlove.wiki/wiki/Every_Day_I_Grow_Some_More',
    imgUrl:
      'https://lessonsinlove.wiki/images/thumb/a/a1/EveryDayIGrowSomeMore.png/250px-EveryDayIGrowSomeMore.png',
    id: '0',
    title: 'Every Day I Grow Some More',
    type: 'Main Event',
    synopsis: 'TEXT TODO',
    version: '0.1',
  },
]

export function StructuralGraph() {
  const firstCard = data[0]

  return (
    <>
      <Helmet>
        <title>Graph Page</title>
      </Helmet>
      <PageWrapper>
        <div style={{ color: 'pink' }}>Cock</div>
        <EvenCard data={firstCard} />
      </PageWrapper>
    </>
  )
}
