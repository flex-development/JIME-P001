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

it('does not add the class "form-control-lg" to <input type="checkbox"> and <input type="radio"> elements', () => {
  const testid = 'checkbox'

  const { getByTestId } = render(
    <Checkbox {...Checkbox.args} data-testid={testid} size='lg' />
  )

  expect(getByTestId(testid)).not.toHaveClass('form-control-lg')
})

it('adds the class "form-check-input" to <input type="checkbox"> and <input type="radio"> elements, not "form-control"', () => {
  let testid = 'checkbox'

  const { getByTestId: getCheckbox } = render(
    <Checkbox {...Checkbox.args} data-testid={testid} />
  )

  let element = getCheckbox(testid)

  expect(element).toHaveAttribute('type', 'checkbox')

  expect(element).toHaveClass('form-check-input')
  expect(element).not.toHaveClass('form-control')

  testid = 'radio'

  const { getByTestId: getRadio } = render(
    <Radio {...Radio.args} data-testid={testid} />
  )

  element = getRadio(testid)

  expect(element).toHaveAttribute('type', 'radio')

  expect(element).toHaveClass('form-check-input')
})

it('adds the class "form-file-input" to <input type="file"> elements, not "form-control"', () => {
  const testid = 'file'

  const { getByTestId } = render(
    <Default {...Default.args} data-testid={testid} type='file' />
  )

  const element = getByTestId(testid)

  expect(element).toHaveClass('form-file-input')
  expect(element).not.toHaveClass('form-control')
})
