import { EventHandlers } from '@system/types'
import { isFunction } from 'lodash'
import React, { CSSProperties, FC, UIEvent } from 'react'
import Editor from 'react-markdown-editor-lite'
import { HtmlType } from 'react-markdown-editor-lite/editor/preview'
import { EditorConfig } from 'react-markdown-editor-lite/share/var'
import { MDXBox } from '../../atoms'

/**
 * @file Markdown editor with MDX formatting capabilities
 * @module organisms/MDXEditor
 */

export type MDXEditorData = {
  html: string
  text: string
}

export type MDXEditorRenderHTMLOutput =
  | HtmlType
  | Promise<HtmlType>
  | (() => HtmlType)

export interface MDXEditorProps extends EditorConfig {
  /**
   * Editor configuration options.
   */
  config?: EditorConfig

  /**
   * Object indicating what the user can view in the editor.
   */
  canView?: EditorConfig['canView']

  /**
   * Default editor value.
   */
  defaultValue?: string

  /**
   * Function to render editor content.
   *
   * @default text => <MDXBox>{text}</MDXBox>
   */
  handleRender?: (text: string) => MDXEditorRenderHTMLOutput

  /**
   * Unique element id.
   */
  id?: string

  /**
   * Code to call when the `blur` event is fired.
   */
  onBlur?: (event: EventHandlers.Focus.TextArea) => void

  /**
   * Code to call when the `change` event is fired.
   */
  onChange?: (
    data: MDXEditorData,
    event?: EventHandlers.Change.TextArea
  ) => void

  /**
   * Code to call when the `focus` event is fired.
   */
  onFocus?: (event: EventHandlers.Focus.TextArea) => void

  /**
   * Code to call when the `scroll` event is fired.
   */
  onScroll?: (
    event: UIEvent<HTMLTextAreaElement | HTMLDivElement>,
    type: 'md' | 'html'
  ) => void

  /**
   * Placeholder text to display in editor.
   */
  placeholder?: string

  /**
   * Markdown plugins to use.
   */
  plugins?: string[]

  /**
   * True if user shouldn't be able to input new content.
   */
  readOnly?: boolean

  /**
   * Additional CSS styles.
   */
  style?: CSSProperties

  /**
   * Current editor value.
   */
  value?: string

  /**
   * Object indicating what should be visible when the editor loads.
   */
  view?: EditorConfig['view']
}

/**
 * The `MDXEditor` component provides a default `renderHTML` function, but the
 * component type definiton, which we don't have access to, requires a
 * `renderHTML` property.
 */
type EditorProps = MDXEditorProps & {
  renderHTML: NonNullable<MDXEditorProps['handleRender']>
}

/**
 * Markdown editor with MDX formatting capabilities.
 *
 * - https://mdxjs.com/
 * - https://github.com/HarryChen0506/react-markdown-editor-lite
 */
export const MDXEditor: FC<MDXEditorProps> = (props: MDXEditorProps) => {
  const { handleRender: render, ...rest } = props

  const renderHTML: EditorProps['renderHTML'] = text => {
    return isFunction(render) ? render?.(text) : <MDXBox>{text}</MDXBox>
  }

  return <Editor {...(rest as MDXEditorProps)} renderHTML={renderHTML} />
}

MDXEditor.displayName = 'MDXEditor'

MDXEditor.defaultProps = {
  canView: {
    fullScreen: true,
    hideMenu: false,
    html: true,
    md: true,
    menu: true
  },
  view: {
    html: false,
    md: true,
    menu: true
  }
}
