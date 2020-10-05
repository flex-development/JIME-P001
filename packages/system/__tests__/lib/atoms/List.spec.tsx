import { Ordered, Unordered } from '@kustomz-stories/atoms/List.stories'
import { render } from '@testing-library/react'
import React from 'react'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - List
 * @module tests/lib/atoms/List
 */

it('renders an <ol> element with nested <li> elements', () => {
  const args: ArgsMatcher = {
    'data-testid': 'ordered',
    ...(Ordered.args as ArgsMatcher)
  }

  const { getByTestId } = render(<Ordered {...args} />)

  expect(getByTestId(args['data-testid'])).not.toBeEmptyDOMElement()
})

it('renders an <ul> element with nested <li> elements', () => {
  const args: ArgsMatcher = {
    'data-testid': 'unordered',
    ...(Ordered.args as ArgsMatcher)
  }

  const { getByTestId } = render(<Unordered {...args} />)

  expect(getByTestId(args['data-testid'])).not.toBeEmptyDOMElement()
})
