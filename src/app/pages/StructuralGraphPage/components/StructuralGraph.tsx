import * as React from 'react'
import ReactFlow from 'react-flow-renderer'
import { GameEvent } from 'types'
import { EventCard } from './EventCard'

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

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'card',
    data: data[0],
    position: { x: 350, y: 300 },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

export function StructuralGraph() {
  const [nodes, setNodes] = React.useState(initialNodes)
  const [edges, setEdges] = React.useState(initialEdges)

  // const [dimensions, setDimensions] = React.useState({
  //   height: window.innerHeight,
  //   width: window.innerWidth,
  // })

  // React.useEffect(() => {
  //   function handleResize() {
  //     console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
  //     // setDimensions({
  //     //   height: window.innerHeight,
  //     //   width: window.innerWidth,
  //     // })
  //   }

  //   // window.addEventListener('resize', handleResize)
  // })

  const nodeTypes = React.useMemo(() => ({ card: EventCard }), [])

  // return <div>cock</div>
  return (
    <ReactFlow
      style={{
        backgroundColor: 'pink',
        width: '100%',
        height: 'calc(100vh - 90px)',
      }}
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
    />
  )
}
