import { Node } from 'react-flow-renderer'

import { GameEvent } from '@sg/types'

type CardNode = {
  type: 'card'
  data: GameEvent | { [key: string]: unknown }
}

type CharacterDividerNode = {
  type: 'characterDivider'
}

export type CustomNode = CardNode | CharacterDividerNode | Node
