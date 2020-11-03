import { CollectionTemplate } from '@system/components'
import { Products } from '@system/stories/lib/templates/CollectionTemplate.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - CollectionTemplate
 * @module tests/lib/templates/CollectionTemplate
 */

it('renders without crashing', () => {
  const { template_id } = CollectionTemplate

  const { container } = render(<Products {...Products.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})

it('renders the collection title', () => {
  const { getByText } = render(<Products {...Products.args} />)

  expect(getByText(Products.args.title)).toBeInTheDocument()
})

it('renders the collection description', () => {
  const { getByText } = render(<Products {...Products.args} />)

  expect(getByText(Products.args?.description as string)).toBeInTheDocument()
})
