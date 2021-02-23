import type { OneOrMany } from '@flex-development/json'
import type { TypesetProps } from '@storybook/components/dist/blocks/Typeset'
import { Typeset } from '@storybook/components/dist/blocks/Typeset'
import isArray from 'lodash/isArray'
import pick from 'lodash/pick'
import type { FC } from 'react'

/**
 * @file Get Typeset doc blocks with theme context
 * @module storybook/components/ThemeTypeset
 */

export interface ThemeTypesetProps extends Omit<TypesetProps, 'fontWeight'> {
  fontWeight?: OneOrMany<number>
  text?: boolean
}

export const fontSizes: Record<number | string, string> = {
  12: '0.75rem',
  14: '0.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  24: '1.5rem',
  32: '2rem',
  36: '2.25rem',
  48: '3rem',
  60: '3.75rem'
}

fontSizes.xs = fontSizes[12]
fontSizes.sm = fontSizes[14]
fontSizes.md = fontSizes[16]
fontSizes.lg = fontSizes[18]
fontSizes.xl = fontSizes[20]
fontSizes.xxl = fontSizes[24]

fontSizes.h1 = fontSizes[60]
fontSizes.h2 = fontSizes[48]
fontSizes.h3 = fontSizes[36]
fontSizes.h4 = fontSizes.xxl
fontSizes.h5 = fontSizes.xl
fontSizes.h6 = fontSizes.lg

export const ThemeTypeset: FC<ThemeTypesetProps> = props => {
  const { fontWeight, text, ...rest } = props

  // Pick heading sizes from theme spec
  const sizes_h = pick(fontSizes, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

  // Pick body text sizes from theme spec
  const sizes_b = pick(fontSizes, ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'])

  // Override fontSizes property
  rest['fontSizes'] = Object.values(text ? sizes_b : sizes_h) as string[]

  // Return single Typset if only one font weight to display
  if (!isArray(fontWeight)) return <Typeset {...rest} fontWeight={fontWeight} />

  // Return fragment with array of Typesets
  return (
    <>
      {fontWeight.map(w => (
        <Typeset {...rest} fontWeight={w} />
      ))}
    </>
  )
}
