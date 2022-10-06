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
import { ModalInfo } from './ModalInfo'
import { GameEventsBuilder } from '../lib/GameEventsBuilder'
import { CardNode, CustomNode } from '../types'

const EDGE_SELECTED_INCOMING_COLOR = '#9c9998'
const EDGE_SELECTED_OUTCOMING_COLOR = '#d9765d'

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
  const [state, setState] = React.useState<{
    nodes: CustomNode[]
    edges: Edge[]
  }>({
    nodes: [],
    edges: [],
  })
  const { nodes, edges } = state

  const [modal, setModal] = React.useState<GameEvent | null>(null)

  ///

  const nodeTypes = React.useMemo(
    () => ({ card: EventCard, characterDivider: CharacterDivider }),
    [],
  )

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
    },
    [state],
  )

  const onNodeDoubleClick = React.useCallback(
    (mouseEvent: React.MouseEvent, cardNode: CardNode) => {
      setModal(cardNode.data)
    },
    [setModal],
  )

  ///

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
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeDoubleClick={onNodeDoubleClick as NodeMouseHandler}
        minZoom={0.1}
      />

      {modal && <ModalInfo data={modal} closeModal={() => setModal(null)} />}
    </div>
  )
}
