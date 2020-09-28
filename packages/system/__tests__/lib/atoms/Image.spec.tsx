import { render } from '@testing-library/react'
import React from 'react'
import {
  Fluid,
  Thumbnail
} from '../../../storybook/stories/lib/atoms/Image.stories'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Image
 * @module tests/lib/atoms/Image
 */

it('renders a fluid image', () => {
  // @ts-expect-error
  const { getByAltText } = render(<Fluid {...Fluid.args} />)
  const { alt } = (Fluid.args || {}) as ArgsMatcher

  expect(getByAltText(alt)).toHaveClass('img-fluid')
})

it('renders a thumbnail image', () => {
  // @ts-expect-error
  const { getByAltText } = render(<Thumbnail {...Thumbnail.args} />)
  const { alt } = (Thumbnail.args || {}) as ArgsMatcher

  expect(getByAltText(alt)).toHaveClass('img-thumbnail')
})
