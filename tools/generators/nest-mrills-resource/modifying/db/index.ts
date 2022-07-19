import { Tree } from '@nrwl/devkit'
import { ResourceOptions } from '../../resource.schema'

import { noneHandler } from './none'
import { mongooseHandler } from './mongoose'

export type Handler = (tree: Tree, options: ResourceOptions) => any

export const dbHandlers: { [key: string]: Handler } = {
  ['none']: noneHandler,
  ['mongoose']: mongooseHandler,
}
