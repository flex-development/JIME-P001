import { render } from '@testing-library/react'
import { Form } from './Form'

/**
 * @file Unit Tests - Form
 * @module components/ui/atoms/Form/spec
 */

it('renders <form class="form" />', () => {
  const { container } = render(<Form />)

  expect(container.firstChild).toHaveClass('form')
})
