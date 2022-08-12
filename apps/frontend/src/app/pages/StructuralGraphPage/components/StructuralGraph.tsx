import * as React from 'react'
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'react-flow-renderer'

import { GameEvent, Id } from '@sg/types'

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

type CustomNode = {
  type?: 'input' | 'output' | 'card'
  data: GameEvent | { [key: string]: any }
} & Node

const initialNodes: CustomNode[] = [
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

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

function sortEvents(
  event1: [string, GameEvent[]],
  event2: [string, GameEvent[]],
): number {
  const v1 = event1[0]
  const v2 = event2[0]

  const getReleaseVersion = (str: string) => {
    const vStrs = str.split('.')

    return vStrs[0] === '' ? 0 : +vStrs[0]
  }

  const getMainVersion = (str: string) => {
    if (typeof str !== 'string') return str
    const vStrs = str.split('.')
    const vStr = vStrs[1].match(/^([0-9])*/g) as any

    return vStr[0]
  }

  const getSubVersion = (str: string) => {
    if (typeof str !== 'string') return str
    const vStrs = str.split('.')

    return vStrs[1]
  }
  const v1Release = getReleaseVersion(v1)
  const v2Release = getReleaseVersion(v2)
  if (v1Release !== v2Release) return v1Release - v2Release

  const v1Main = getMainVersion(v1)
  const v2Main = getMainVersion(v2)
  if (v1Main !== v2Main) return v1Main - v2Main

  const v1Sub = getSubVersion(v1)
  const v2Sub = getSubVersion(v2)
  if (v1Sub !== v2Sub) return v1Sub.localeCompare(v2Sub)

  return 0
}

export function StructuralGraph({
  serverEvents,
}: {
  serverEvents: GameEvent[]
}) {
  const [nodes, setNodes] = React.useState<Node[]>(initialNodes)
  const [edges, setEdges] = React.useState(initialEdges)

  React.useEffect(() => {
    const versionCollection = {} as { [key: string]: GameEvent[] }
    serverEvents.forEach(event => {
      const version = event.version

      if (!versionCollection[version]) {
        versionCollection[version] = [event]
      } else {
        versionCollection[version].push(event)
      }
    })

    const newNodes = Object.entries(versionCollection)
      .sort(sortEvents)
      .map(([_, eventRow], yOffset) => {
        return eventRow.map((event, xOffset) => ({
          id: (event as any)._id,
          type: 'card',
          data: event,
          position: {
            x: xOffset * 280,
            y: yOffset * 160,
          },
        }))
      })
      .flat()

    const newEdges: Edge[] = serverEvents
      .filter(event => (event as any)._id && event.nextEventId)
      .filter(
        event => !!serverEvents.find(v => (v as any)._id === event.nextEventId),
      )
      .map((event, i) => ({
        id: (event as any)._id + '-' + event.nextEventId,
        source: (event as any)._id,
        target: event.nextEventId as string,
      }))

    // setNodes([...newNodes, ...nodes] as any)
    setNodes(newNodes as any)
    setEdges(newEdges as any)
  }, [serverEvents])

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

  const onNodesChange = React.useCallback(
    (changes: NodeChange[]) => {
      // console.log(changes)
      return setNodes(nds => applyNodeChanges(changes, nds as any) as any)
    },
    [setNodes],
  )
  const onEdgesChange = React.useCallback(
    (changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges],
  )

  const nodeTypes = React.useMemo(() => ({ card: EventCard }), [])

  // return <div>cock</div>
  return (
    <ReactFlow
      style={{
        backgroundColor: 'pink',
        width: '100%',
      }}
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      minZoom={0.1}
    />
  )
}
