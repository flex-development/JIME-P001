import { BoxProps } from '@system/lib/atoms/Box'
import { MDXProps } from '@system/types'

/**
 * @file Component Props - MDXContent
 * @module lib/atoms/MDXContent/props
 */

export type MDXContentProps = Omit<BoxProps, 'children'> & MDXProps
