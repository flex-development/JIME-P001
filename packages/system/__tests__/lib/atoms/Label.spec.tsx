import { render } from '@testing-library/react'
import React from 'react'
import { Default } from '../../../storybook/stories/lib/atoms/Label.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Label
 * @module tests/lib/atoms/Label
 */

it('adds the class "form-label"', () => {
  const { getByText } = render(<Default {...Default.args} />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toHaveClass('form-label')
})

it('adds the attribute data-required and renders text with an asterisk when props.required is true', () => {
  const args = Object.assign({ required: true }, Default.args)

  const { getByText } = render(<Default {...args} />)

  expect(getByText(`*${args.children}`)).toHaveAttribute('data-required')
})
