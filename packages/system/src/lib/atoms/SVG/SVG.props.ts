import type { AnimatedProps } from '@react-spring/web'
import type {
  ComponentPropsBase as CPB,
  JSXIEPropsOr,
  Merge
} from '@system/types'
import type { SVGAttributes } from 'react'

/**
 * @file Component Props - SVG
 * @module lib/atoms/SVG/props
 */

export interface SVGProps
  extends Merge<CPB<'svg'>, Omit<SVGAttributes<SVGSVGElement>, 'style'>> {
  /**
   * If true, render a loading donut animation.
   */
  $loading?: boolean
}

export type SVGAnimatedProps = AnimatedProps<JSXIEPropsOr<'svg'>>
