import { render } from '@testing-library/react'
import React from 'react'
import { Checkbox, Default, Radio } from './Input.stories'

/**
 * @file Tests - Input
 * @module components/atoms/Input/spec
 */

it('adds the class "form-control" to non <input type="checkbox"> and <input type="radio"> elements, not "form-check-input" or "form-file-input"', () => {
  const { getByPlaceholderText } = render(<Default {...Default.args} />)
  const { placeholder } = Default.args as ArgsMatcher

  const element = getByPlaceholderText(placeholder)

  expect(element).toHaveAttribute('type', 'text')

  expect(element).toHaveClass('form-control')
  expect(element).not.toHaveClass('form-check-input')
  expect(element).not.toHaveClass('form-file-input')
})

it('does not add the class "form-control-lg" to <input type="checkbox"> and <input type="radio"> elements', () => {
  const { container } = render(<Checkbox {...Checkbox.args} size='lg' />)

  expect(container.firstChild).not.toHaveClass('form-control-lg')
})

it('adds the class "form-check-input" to <input type="checkbox">, not "form-control"', () => {
  const { container } = render(<Checkbox {...Checkbox.args} />)

  expect(container.firstChild).toHaveAttribute('type', 'checkbox')

  expect(container.firstChild).toHaveClass('form-check-input')
  expect(container.firstChild).not.toHaveClass('form-control')
})

it('adds the class "form-check-input" to <input type="radio"> elements, not "form-control"', () => {
  const { container } = render(<Radio {...Radio.args} />)

  expect(container.firstChild).toHaveAttribute('type', 'radio')

  expect(container.firstChild).toHaveClass('form-check-input')
  expect(container.firstChild).not.toHaveClass('form-control')
})

it('adds the class "form-file-input" to <input type="file"> elements, not "form-control"', () => {
  const { container } = render(<Default {...Default.args} type='file' />)

  expect(container.firstChild).toHaveClass('form-file-input')
  expect(container.firstChild).not.toHaveClass('form-control')
})
