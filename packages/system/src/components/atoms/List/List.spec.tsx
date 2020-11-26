import { render } from '@testing-library/react'
import React from 'react'
import { Ordered, Unordered } from './List.stories'

/**
 * @file Tests - List
 * @module components/atoms/List/spec
 */

it('renders an <ol> element with nested <li> elements', () => {
  const { container } = render(<Ordered {...Ordered.args} />)

  expect(container.firstChild).not.toBeEmptyDOMElement()
})

it('renders an <ul> element with nested <li> elements', () => {
  const { container } = render(<Unordered {...Unordered.args} />)

  expect(container.firstChild).not.toBeEmptyDOMElement()
})
