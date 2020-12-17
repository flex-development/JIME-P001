import { render } from '@testing-library/react'
import { Default } from './Dialog.stories'

/**
 * @file Tests - Dialog
 * @module components/ui/atoms/Dialog/spec
 */

describe('Dialog', () => {
  it('renders a <dialog> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('dialog')
  })

  it('renders inner content', () => {
    const { container, getByText } = render(<Default {...Default.args} />)
    const { children } = Default.args

    expect(container.firstChild).toContainElement(getByText(children as string))
  })
})
