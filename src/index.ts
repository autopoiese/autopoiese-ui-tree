import { Item } from './Item'
import { Tree } from './Tree'

type ExtendedTree = typeof Tree & { Item: typeof Item }

const T = Tree as ExtendedTree
T.Item = Item

export { T as Tree, Item }
