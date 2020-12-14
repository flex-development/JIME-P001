import { render } from '@testing-library/react'
import { Default } from './Divider.stories'

/**
 * @file Tests - Divider
 * @module components/ui/atoms/Divider/spec
 */

it('renders <hr class="divider">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('divider')
})
