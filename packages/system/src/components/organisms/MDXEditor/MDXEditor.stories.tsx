import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { MDXEditor, MDXEditorProps } from './MDXEditor'

/**
 * @file Stories - MDXEditor
 * @module components/organisms/MDXEditor/stories
 */

export default {
  component: MDXEditor,
  parameters: {
    jest: ['MDXEditor']
  },
  title: 'Library/Organisms/MDXEditor'
}

export const Default: StoryFN<MDXEditorProps> = (args: MDXEditorProps) => (
  <MDXEditor {...args} />
)

Default.args = MDXEditor.defaultProps as MDXEditorProps
