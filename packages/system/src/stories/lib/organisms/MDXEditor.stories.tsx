import { MDXEditor, MDXEditorProps } from '@system/components'
import { StoryFN } from '@system/types'
import React from 'react'

/**
 * @file Stories - MDXEditor
 * @module stories/lib/organisms/MDXEditor
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
