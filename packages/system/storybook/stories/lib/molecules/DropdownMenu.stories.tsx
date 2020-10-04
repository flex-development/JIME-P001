import { Dropdown, DropdownProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../config'

/**
 * @file Stories - Dropdown
 * @module stories/lib/molecules/Dropdown
 */

export default {
  component: Dropdown,
  parameters: {
    jest: ['Dropdown']
  },
  title: 'Library/Molecules/Dropdown'
}

export const ProductOptions: StoryFN<DropdownProps> = (
  args: DropdownProps
) => <Dropdown {...args} />

ProductOptions.args = {
  links: [
    { children: 'FUNFETTI' },
    { children: 'JELLY $LIDES' },
    { children: 'LA $ONRISA' }
  ],
  title: 'Options'
}
