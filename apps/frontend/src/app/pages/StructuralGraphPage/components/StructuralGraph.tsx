import * as React from 'react'
import ReactFlow, {
  applyNodeChanges,
  Edge,
  Node,
  NodeChange,
  NodeMouseHandler,
} from 'react-flow-renderer'

import { GameEvent } from '@sg/types'

import { EventCard } from './EventCard'
import { CharacterDivider } from './CharacterDivider'
import { GameEventsBuilder } from '../lib/GameEventsBuilder'
import { CardNode, CustomNode } from '../types'

const EDGE_SELECTED_INCOMING_COLOR = '#9c9998'
const EDGE_SELECTED_OUTCOMING_COLOR = '#d9765d'

function customApplyNodeChanges(chandes: any[], nodes: any[]): any[] {
  return []
}

function customApplyEdgeChanges(changes: any[], edges: any[]): any[] {
  let newEdges = edges

  changes
    .sort((change1, change2) => {
      const v1 = change1.type !== 'select' ? 0 : change1.selected ? 2 : 1
      const v2 = change2.type !== 'select' ? 0 : change2.selected ? 2 : 1

      return v1 - v2
    })
    .forEach(change => {
      if (change.type === 'select') {
        newEdges = newEdges.map(edge => {
          if (change.selected) {
            if (edge.target !== change.id && edge.source !== change.id) {
              return edge
            }

            return {
              ...edge,
              style: {
                stroke:
                  edge.target === change.id
                    ? EDGE_SELECTED_INCOMING_COLOR
                    : EDGE_SELECTED_OUTCOMING_COLOR,
                strokeWidth: 4,
              },
            }
          } else {
            if (edge.target !== change.id && edge.source !== change.id) {
              return edge
            }

            const { style, ...rest } = edge as any

            return rest
          }
        })
      }
    })

  return newEdges
}

export function StructuralGraph({
  serverEvents,
}: {
  serverEvents: GameEvent[]
}) {
  // const [nodes, setNodes] = React.useState<Node[]>([])
  // const [edges, setEdges] = React.useState<Edge[]>([])
  const [state, setState] = React.useState<{
    nodes: CustomNode[]
    edges: Edge[]
  }>({
    nodes: [],
    edges: [],
  })
  const { nodes, edges } = state

  React.useEffect(() => {
    const builder = new GameEventsBuilder(serverEvents)

    const { nodes, edges } = builder.getGraphInput()

    setState({ nodes, edges })
  }, [serverEvents])

  const onNodesChange = React.useCallback(
    (changes: NodeChange[]) => {
      setState({
        nodes: applyNodeChanges(changes, nodes as any),
        edges: customApplyEdgeChanges(changes, edges),
      })
      // setEdges(edgs => customApplyEdgeChanges(changes, edgs))
      // setNodes(nds => applyNodeChanges(changes, nds))
    },
    [
      state,
      // edges,
      // nodes,
      // setNodes,
      // setEdges
    ],
  )

  const nodeTypes = React.useMemo(
    () => ({ card: EventCard, characterDivider: CharacterDivider }),
    [],
  )

  const onNodeDoubleClickHandler = React.useCallback(
    (mouseEvent: React.MouseEvent, cardNode: CardNode) => {
      console.log(cardNode)
      const cardId = cardNode.data.id
      console.log(cardId)

      //TODO show modular window
    },
    [],
  )

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <ReactFlow
        style={{
          backgroundColor: 'pink',
          width: '100%',
        }}
        nodeTypes={nodeTypes}
        nodes={nodes as any}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeDoubleClick={onNodeDoubleClickHandler as NodeMouseHandler}
        minZoom={0.1}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#393939',
          textAlign: 'center',
          fontSize: '24',

          zIndex: 9,
        }}
      >
        <h2>TODO</h2>
      </div>
    </div>
  )
}
