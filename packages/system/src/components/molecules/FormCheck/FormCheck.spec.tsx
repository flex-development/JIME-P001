import { render, screen } from '@testing-library/react'
import React from 'react'
import { Checkbox, Switch, ToggleButton } from './FormCheck.stories'

/**
 * @file Tests - FormCheck
 * @module components/molecules/FormCheck/spec
 */

it('renders without crashing', () => {
  const { container, getByText } = render(<Checkbox {...Checkbox.args} />)

  // Expect first element to have class "form-check" and `data-type='checkbox'`
  expect(container.firstChild).toHaveClass('form-check')
  expect(container.firstChild).toHaveAttribute('data-type', 'checkbox')

  // Get `<input>` and `<label>` elements
  const input = screen.getByDisplayValue('')
  const label = getByText(Checkbox.args.label as string)

  // Expect `<input>` and `<label>` elements to be rendered inside
  expect(container.firstChild).toContainElement(input)
  expect(container.firstChild).toContainElement(label)

  // Expect `<input type='checkbox'>`
  expect(input).toHaveAttribute('type', 'checkbox')

  // Expect `<label class='form-check-label'>`
  expect(label).toHaveClass('form-check-label')
})

it('renders with the class "form-switch"', () => {
  const { container } = render(<Switch {...Switch.args} />)

  // Expect first element to have class "form-switch" and `data-type='checkbox'`
  expect(container.firstChild).toHaveClass('form-check')
  expect(container.firstChild).toHaveAttribute('data-type', 'checkbox')

  // Expect `<input type='checkbox'>`
  expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'checkbox')
})

it('renders a button-style checkbox or radio element', () => {
  const { getByText } = render(<ToggleButton {...ToggleButton.args} />)

  // Get `<input>` and `<label>` elements
  const input = screen.getByDisplayValue('')
  const label = getByText(ToggleButton.args.label as string)

  // Expect `<input class='btn-check'>`
  expect(input).toHaveClass('btn-check')

  // Expect `<label class='btn'>`
  expect(label).toHaveClass(`btn btn-${ToggleButton.args.btn}`)
  expect(label).not.toHaveClass('form-check-label')
})
