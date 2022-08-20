import { Node } from 'react-flow-renderer'

import { GameEvent } from '@sg/types'

export type CardNodeData = GameEvent | { [key: string]: unknown }
export type CardNode = {
  type: 'card'
  data: CardNodeData
} & Node

export type CharacterDividerNode = {
  type: 'characterDivider'
} & Node

export type CustomNode = CardNode | CharacterDividerNode | Node
