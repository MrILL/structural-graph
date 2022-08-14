import { Node } from 'react-flow-renderer'

import { GameEvent } from '@sg/types'

export type CustomNode = {
  type?: 'input' | 'output' | 'card'
  data: GameEvent | { [key: string]: unknown }
} & Node
