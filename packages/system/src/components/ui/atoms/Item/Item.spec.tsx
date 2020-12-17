import { render } from '@testing-library/react'
import { Default } from './Item.stories'

/**
 * @file Tests - Item
 * @module components/ui/atoms/Item/spec
 */

describe('Item', () => {
  it('renders a <li> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('li')
  })

  it('renders the item text', () => {
    const { getByText } = render(<Default {...Default.args} />)

    expect(getByText(Default.args.children as string)).toBeInTheDocument()
  })
})
