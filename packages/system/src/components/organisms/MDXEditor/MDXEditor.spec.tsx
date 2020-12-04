import { render } from '@testing-library/react'
import { Default } from './MDXEditor.stories'

/**
 * @file Tests - MDXEditor
 * @module components/organisms/MDXEditor/impl
 */

it('renders without crashing', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('rc-md-editor')
})
