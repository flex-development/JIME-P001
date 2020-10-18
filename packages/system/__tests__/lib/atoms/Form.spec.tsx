import { Form } from '@system/lib'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Unit Tests - Form
 * @module tests/lib/atoms/Form
 */

it('renders <form class="form" />', () => {
  const { container } = render(<Form />)

  expect(container.firstChild).toHaveClass('form')
})
