import * as React from 'react'
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'react-flow-renderer'

import { GameEvent } from '@sg/types'

import { EventCard } from './EventCard'
import { GameEventsBuilder } from '../lib/GameEventsBuilder'

export function StructuralGraph({
  serverEvents,
}: {
  serverEvents: GameEvent[]
}) {
  const [nodes, setNodes] = React.useState<Node[]>([])
  const [edges, setEdges] = React.useState<Edge[]>([])

  React.useEffect(() => {
    const builder = new GameEventsBuilder(serverEvents)

    const { nodes, edges } = builder.getGraphInput()

    setNodes(nodes)
    setEdges(edges)
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
      return setNodes(nds => applyNodeChanges(changes, nds))
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
