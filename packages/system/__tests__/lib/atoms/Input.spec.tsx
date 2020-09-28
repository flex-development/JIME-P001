import { Input, InputProps } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'
import {
  Checkbox,
  Default,
  Radio
} from '../../../storybook/stories/lib/atoms/Input.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Input
 * @module tests/lib/atoms/Input
 */

it('adds the class "form-control" to non <input type="checkbox"> and <input type="radio"> elements, not "form-check-input" or "form-file-input"', () => {
  const { getByPlaceholderText } = render(<Default {...Default.args} />)
  const { placeholder } = (Default.args || {}) as ArgsMatcher

  const element = getByPlaceholderText(placeholder)

  expect(element).toHaveAttribute('type', 'text')

  expect(element).toHaveClass('form-control')
  expect(element).not.toHaveClass('form-check-input')
  expect(element).not.toHaveClass('form-file-input')
})

it('adds the class "form-check-input" to <input type="checkbox"> and <input type="radio"> elements, not "form-control"', () => {
  let args = Object.assign({ 'data-testid': 'checkbox' }, Checkbox.args)

  const { getByTestId: getCheckbox } = render(<Checkbox {...args} />)

  let element = getCheckbox(args['data-testid'])

  expect(element).toHaveAttribute('type', 'checkbox')

  expect(element).toHaveClass('form-check-input')
  expect(element).not.toHaveClass('form-control')

  args = Object.assign({ 'data-testid': 'radio' }, Radio.args)

  const { getByTestId: getRadio } = render(<Radio {...args} />)

  element = getRadio(args['data-testid'])

  expect(element).toHaveAttribute('type', 'radio')

  expect(element).toHaveClass('form-check-input')
})

it('adds the class "form-file-input" to <input type="file"> elements, not "form-control"', () => {
  const args = { 'data-testid': 'file', type: 'file' } as InputProps

  const { getByTestId } = render(<Input {...args} />)

  const element = getByTestId(args['data-testid'])

  expect(element).toHaveClass('form-file-input')
  expect(element).not.toHaveClass('form-control')
})
