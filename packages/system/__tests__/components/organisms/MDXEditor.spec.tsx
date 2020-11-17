import { Default } from '@system/stories/lib/organisms/MDXEditor.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - MDXEditor
 * @module tests/lib/organisms/MDXEditor
 */

it('renders without crashing', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('rc-md-editor')
})
