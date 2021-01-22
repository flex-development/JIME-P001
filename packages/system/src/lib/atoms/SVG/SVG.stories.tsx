import { SVG } from './SVG'
import type { SVGProps } from './SVG.props'

/**
 * @file Stories - SVG
 * @module lib/atoms/SVG/stories
 */

export default {
  component: SVG,
  parameters: {
    jest: ['SVG']
  },
  title: 'Library/Atoms/SVG'
}

export const LoadingDonut: FCS<SVGProps> = args => <SVG {...args} />

LoadingDonut.args = {
  $loading: true
}
