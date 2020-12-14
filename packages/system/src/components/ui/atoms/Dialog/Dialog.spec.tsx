import { render } from '@testing-library/react'
import { Default } from './Dialog.stories'

/**
 * @file Tests - Dialog
 * @module components/ui/atoms/Dialog/spec
 */

it('renders without crashing', () => {
  const { container, getByText } = render(<Default {...Default.args} />)
  const { children } = Default.args

  expect(container.firstChild).toContainElement(getByText(children as string))
})
