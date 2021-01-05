import { render } from '@testing-library/react'
import { Ordered, Unordered } from './List.stories'

/**
 * @file Tests - List
 * @module lib/atoms/List/spec
 */

describe('List', () => {
  const testChildNodeNames = (node: ChildNode | null) => {
    expect(node).not.toBeEmptyDOMElement()

    return node?.childNodes.forEach(({ nodeName }) => {
      expect(nodeName.toLowerCase()).toBe('li')
    })
  }

  it('renders an <ol> element with nested <li> elements', () => {
    const { container } = render(<Ordered {...Ordered.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('ol')

    testChildNodeNames(container.firstChild)
  })

  it('renders an <ul> element with nested <li> elements', () => {
    const { container } = render(<Unordered {...Unordered.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('ul')

    testChildNodeNames(container.firstChild)
  })
})
