import { Default } from '@kustomz-stories/atoms/Label.stories'
import { render } from '@testing-library/react'
import React from 'react'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Label
 * @module tests/lib/atoms/Label
 */

it('adds the class "form-label" when props.form is true', () => {
  const { getByText } = render(<Default {...Default.args} form />)
  const { children } = (Default.args || {}) as ArgsMatcher

  expect(getByText(children)).toHaveClass('form-label')
})

it('adds the attribute data-required and renders text with an asterisk when props.required is true', () => {
  const { getByText } = render(<Default {...Default.args} required />)

  expect(getByText(`*${Default.args?.children}`)).toHaveAttribute(
    'data-required'
  )
})
