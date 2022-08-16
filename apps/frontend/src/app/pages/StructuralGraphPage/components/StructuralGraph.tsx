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
  // console.log(edges)

  React.useEffect(() => {
    const builder = new GameEventsBuilder(serverEvents)

    const { nodes, edges } = builder.getGraphInput()

    setNodes(nodes)
    setEdges(edges)
  }, [serverEvents])

  const onNodesChange = React.useCallback(
    (changes: NodeChange[]) => {
      // console.log(changes)
      const selectChange = changes.find(change => change.type === 'select')

      const newEdges: any[] = edges.map(edge => {
        if (!selectChange || selectChange.type !== 'select') {
          return edge
        }

        if (selectChange.selected) {
          if (edge.target === selectChange.id) {
            //TODO update incoming edges
            console.log({ ...edge, stroke: '#9c9998', strokeWidth: 4 })
            return { ...edge, stroke: '#9c9998', strokeWidth: 4 }
          } else if (edge.source === selectChange.id) {
            //TODO update outcoming edges
            console.log({ ...edge, stroke: '#d9765d', strokeWidth: 4 })
            return { ...edge, stroke: '#d9765d', strokeWidth: 4 }
          } else {
            return edge
          }
        } else {
          return edge
          // if (
          //   edge.target === selectChange.id ||
          //   edge.source === selectChange.id
          // ) {
          //   const { stroke, strokeWidth, ...rest } = edge as any
          //   return rest
          // } else {
          //   return edge
          // }
        }
      })

      // console.log(newEdges)
      setEdges(newEdges)
      setNodes(nds => applyNodeChanges(changes, nds))
    },
    [serverEvents, edges, nodes, setNodes, setEdges],
  )
  // const onEdgesChange = React.useCallback(
  //   (changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
  //   [setEdges],
  // )

  const nodeTypes = React.useMemo(() => ({ card: EventCard }), [])

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
      // onEdgesChange={onEdgesChange}
      minZoom={0.1}
    />
  )
}
