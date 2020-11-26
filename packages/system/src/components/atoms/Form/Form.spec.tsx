import { render } from '@testing-library/react'
import React from 'react'
import { Form } from './Form'

/**
 * @file Unit Tests - Form
 * @module components/atoms/Form/spec
 */

it('renders <form class="form" />', () => {
  const { container } = render(<Form />)

  expect(container.firstChild).toHaveClass('form')
})
