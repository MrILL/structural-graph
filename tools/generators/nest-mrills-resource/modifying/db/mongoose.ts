import { Tree, generateFiles } from '@nrwl/devkit'
import { classify } from '@angular-devkit/core/src/utils/strings'
import * as path from 'path'
import * as pluralize from 'pluralize'
import { ResourceOptions } from '../../resource.schema'

export async function mongooseHandler(tree: Tree, options: ResourceOptions) {
  const modulesPath = path.join(
    options.sourceRoot as string,
    options.path as string,
  )
  const modulePath = path.join(modulesPath, options.name)

  const entityFolderPath = path.join(modulePath, 'entities')
  const entityPath = path.join(
    entityFolderPath,
    tree.children(entityFolderPath)[0],
  )
  if (tree.exists(entityPath)) {
    // console.log(`Delete ${entityPath}\n`)
    tree.delete(entityPath)
  }

  generateFiles(
    tree,
    path.join(__dirname, '../../files', options.language as string),
    modulePath,
    {
      ...options,
      sing_name: pluralize.singular(options.name),
      classify: (name: string) => classify(name),
      singular: (name: string) => pluralize.singular(name),
    },
  )

  // const logFile = (fileName: string) => {
  //   console.log(tree.read(path.join(modulePath, fileName))?.toString())
  // }

  // logFile(pluralize.singular(options.name) + '.schema.' + options.language)
  // logFile(options.name + '.service.' + options.language)
  // logFile(options.name + '.controller.' + options.language)
  // logFile(options.name + '.module.' + options.language)
}
