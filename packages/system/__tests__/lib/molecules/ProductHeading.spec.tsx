import { ProductHeadingProps } from '@kustomz/lib'
import { render } from '@testing-library/react'
import React from 'react'
import { AshTray } from '../../../storybook/stories/lib/molecules/ProductHeading.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - ProductHeading
 * @module tests/lib/molecules/ProductHeading
 */

it('renders the title and price of a product', () => {
  const { getByText } = render(
    <AshTray {...(AshTray.args as ProductHeadingProps)} />
  )
  const { price, title } = (AshTray.args || {}) as ArgsMatcher

  expect(getByText(price)).toBeInTheDocument()
  expect(getByText(title)).toBeInTheDocument()
})
