import type { AnyObject } from '@flex-development/json/utils/types'
import type { MDXProviderComponents } from '@mdx-js/react'
import type { BoxProps } from '@system/lib/atoms/Box'

/**
 * @file Component Props - MDXContent
 * @module lib/molecules/MDXContent/props
 */

export interface MDXContentProps extends Omit<BoxProps, 'children'> {
  /**
   * Code output from Babel or Buble code transformation.
   *
   * - https://github.com/flex-development/mdjsx
   */
  code?: string

  /**
   * Object mapping Markdown elements to custom React components.
   */
  components?: MDXProviderComponents

  /**
   * Additional data available in the MDX context.
   */
  scope?: AnyObject
}
