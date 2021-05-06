import * as React from 'react'
import { Meta } from '@storybook/react'
import { Tree } from './index'

export default {
  title: 'Tree',
  component: Tree
} as Meta

export const StoryDeepNested = () => {
  return (
    <Tree>
      <Tree.Item>
        <Tree.Item>
          <Tree.Item>
            <Tree.Item />
            <Tree.Item />
            <Tree.Item />
          </Tree.Item>
        </Tree.Item>
        <Tree.Item>
          <Tree.Item />
          <Tree.Item />
          <Tree.Item />
        </Tree.Item>
      </Tree.Item>
      <Tree.Item>
        <Tree.Item />
        <Tree.Item />
        <Tree.Item>
          <Tree.Item />
          <Tree.Item />
          <Tree.Item>
            <Tree.Item />
            <Tree.Item />
            <Tree.Item />
          </Tree.Item>
        </Tree.Item>
      </Tree.Item>
    </Tree>
  )
}

StoryDeepNested.story = { name: 'Default' }
