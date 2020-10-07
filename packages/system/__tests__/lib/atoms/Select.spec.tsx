import { Default } from '@kustomz-stories/atoms/Select.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Select
 * @module tests/lib/atoms/Select
 */

it('renders a <select> element with nested <option> elements', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).not.toBeEmptyDOMElement()
})
