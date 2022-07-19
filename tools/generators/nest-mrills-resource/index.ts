import { Tree, formatFiles } from '@nrwl/devkit'
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter'

import { dbHandlers, Handler } from './modifying'

import { ResourceOptions } from './resource.schema'

const libraryGenerator = wrapAngularDevkitSchematic(
  '@nestjs/schematics',
  'resource',
)

export default async function (tree: Tree, schema: ResourceOptions) {
  console.log(schema)
  await libraryGenerator(tree, schema)

  const options = transform(schema)

  console.log(`Db handler: ${options.db}`)
  const dbHandler: Handler = dbHandlers[options.db as string] as Handler
  await dbHandler(tree, options)

  await formatFiles(tree)
}

function transform(options: ResourceOptions): ResourceOptions {
  const target = Object.assign({}, options)

  target.name = target.name.toLowerCase()

  return target
}
