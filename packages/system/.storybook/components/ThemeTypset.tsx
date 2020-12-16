import { OneOrMany } from '@flex-development/json'
import {
  Typeset,
  TypesetProps
} from '@storybook/components/dist/blocks/Typeset'
import { isArray, pick } from 'lodash'
import { FC } from 'react'
import { fontSizes } from '../../src/config/sb'

/**
 * @file Get Typeset doc blocks with theme context
 * @module storybook/components/ThemeTypeset
 */

export interface ThemeTypesetProps extends Omit<TypesetProps, 'fontWeight'> {
  fontWeight?: OneOrMany<number>
  text?: boolean
}

export const ThemeTypeset: FC<ThemeTypesetProps> = props => {
  const { fontWeight, text, ...rest } = props

  // Pick heading sizes from theme spec
  const sizes_h = pick(fontSizes, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

  // Pick body text sizes from theme spec
  const sizes_b = pick(fontSizes, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'])

  // Override fontSizes property
  rest['fontSizes'] = Object.values(text ? sizes_b : sizes_h) as string[]

  // Return single Typset if only one font weight to display
  if (!isArray(fontWeight)) return <Typeset {...rest} fontWeight={fontWeight} />

  // Return fragment with array of Typsets
  return (
    <>
      {fontWeight.map(w => (
        <Typeset {...rest} fontWeight={w} />
      ))}
    </>
  )
}
