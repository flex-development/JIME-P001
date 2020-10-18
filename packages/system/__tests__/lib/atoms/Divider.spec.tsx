import { Default } from '@system/stories/lib/atoms/Divider.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - Divider
 * @module tests/lib/atoms/Divider
 */

it('renders <hr class="divider">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('divider')
})
