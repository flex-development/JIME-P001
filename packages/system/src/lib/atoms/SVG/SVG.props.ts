import { ComponentPropsBase as CPB, Merge } from '@system/types'
import { SVGAttributes } from 'react'

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
