import { a } from '@react-spring/web'
import { SVG_CIRCLE_PROPS } from '@system/config/constants'
import { useRewindSpring } from '@system/hooks/useRewindSpring'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { FREC } from '@system/types'
import { forwardRef } from 'react'
import type { SVGAnimatedProps as SVGAProps, SVGProps } from './SVG.props'

/**
 * @file Implementation - SVG
 * @module lib/atoms/SVG/impl
 */

/**
 * Renders a `<svg>` element.
 *
 * - https://developer.mozilla.org/docs/Web/API/SVGElement
 */
export const SVG: FREC<SVGProps> = forwardRef((props, ref) => {
  const { $loading, ...rest } = props

  // Get component properties
  const sanitized = useSanitizedProps<'svg', SVGAProps>(rest, {
    donut: $loading
  })

  // If display a loading animation, get `strokeDashoffset` spring value
  const { value } = useRewindSpring()

  const strokeDasharray = (rest.strokeDasharray || 156) as number
  const strokeDashoffset = value?.to(value => strokeDasharray * (1 - value))

  return (
    <a.svg
      {...sanitized}
      ref={ref}
      strokeDasharray={$loading ? strokeDasharray : rest.strokeDasharray}
      strokeDashoffset={$loading ? strokeDashoffset : rest.strokeDashoffset}
    >
      {(() => {
        if ($loading) return <circle {...SVG_CIRCLE_PROPS} />
        return sanitized.children
      })()}
    </a.svg>
  )
})

SVG.displayName = 'SVG'

SVG.defaultProps = {}
