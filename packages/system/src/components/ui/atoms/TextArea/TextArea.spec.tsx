import { render } from '@testing-library/react'
import { Default } from './TextArea.stories'

/**
 * @file Tests - TextArea
 * @module components/ui/atoms/TextArea/spec
 */

it('renders <textarea class="form-control">', () => {
  const { getByPlaceholderText } = render(<Default {...Default.args} />)
  const { placeholder } = Default.args as ArgsMatcher

  expect(getByPlaceholderText(placeholder)).toHaveClass('form-control')
})
