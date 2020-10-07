import { Ordered, Unordered } from '@kustomz-stories/atoms/List.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - List
 * @module tests/lib/atoms/List
 */

it('renders an <ol> element with nested <li> elements', () => {
  const { container } = render(<Ordered {...Ordered.args} />)

  expect(container.firstChild).not.toBeEmptyDOMElement()
})

it('renders an <ul> element with nested <li> elements', () => {
  const { container } = render(<Unordered {...Unordered.args} />)

  expect(container.firstChild).not.toBeEmptyDOMElement()
})
