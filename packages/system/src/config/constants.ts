import type { IProductImage } from '@kustomzcore'
import { GridBreakpoints } from '@system/types'

/**
 * @file Config - Constant Values
 * @module config/constants
 */

export const API_URL = (() => {
  if (process.env.NODE_ENV?.toLowerCase() === 'production') {
    return 'https://api.morenaskustomz.com'
  }

  return 'https://kapi.flexdevelopment.vercel.app'
})()

export const CHECK_INPUT_TYPES = ['checkbox', 'radio']

export const CONTROL_INPUT_TYPES = [
  'email',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'url'
]

export const EMAIL_PLACEHOLDER = 'you@email.com'

export const DEFAULT_MDX_CODE = `/* @jsxRuntime classic */\n/* @jsx mdx */\n\n\n\nfunction objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }\nconst layoutProps = {\n  \n};\nconst MDXLayout = "wrapper"\nfunction MDXContent(ref) {\n  var components = ref.components;\n  var rest = objectWithoutProperties( ref, ["components"] );\n  var props = rest;\n\n  return mdx( MDXLayout, Object.assign({}, layoutProps, props, { components: components, mdxType: "MDXLayout" })\n\n    );\n}\n\n;\nMDXContent.isMDXComponent = true;`

export const GRID_BREAKPOINT_KEYS: (keyof typeof GridBreakpoints)[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl'
]

export const GRID_COLUMN_UTILITY_CLASS = 'col'

export const GRID_ROW_UTILITY_CLASS = 'row'

export const IMAGE_PLACEHOLDER_URL = `${API_URL}/assets/images/placeholder.webp`

export const PRODUCT_IMAGE_DEFAULT: IProductImage = {
  alt: '',
  created_at: new Date().toUTCString(),
  height: 2048,
  id: -1,
  position: -1,
  product_id: -1,
  src: IMAGE_PLACEHOLDER_URL,
  updated_at: new Date().toUTCString(),
  variant_ids: [],
  width: 2048
}

export const SVG_CIRCLE_PROPS = {
  cx: '20.5',
  cy: '20.5',
  r: '19.5',
  transform:
    'translate(20.500000, 20.500000) rotate(-270.000000) translate(-20.500000, -20.500000)'
}

/**
 * Object mapping prop names to class prefixes.
 */
export const UTILITY_PROP_ALIASES = {
  $bg: 'bg',
  $color: 'text',
  $columns: 'grid-cols',
  $cursor: 'cursor',
  $display: 'd',
  $falign: 'align-items',
  $fdirection: 'flex',
  $fill: 'fill',
  $fjustify: 'justify-content',
  $fs: 'text',
  $fwrap: 'flex',
  $gap: 'gap',
  $gx: 'gx',
  $gy: 'gy',
  $m: 'm',
  $mb: 'mb',
  $ml: 'ml',
  $mr: 'mr',
  $mt: 'mt',
  $mx: 'mx',
  $my: 'my',
  $opacity: 'opacity',
  $p: 'p',
  $pb: 'pb',
  $pl: 'pl',
  $pr: 'pr',
  $pt: 'pt',
  $px: 'px',
  $py: 'py',
  $rows: 'grid-rows',
  $stroke: 'stroke',
  $weight: 'text',
  $z: 'z'
}
