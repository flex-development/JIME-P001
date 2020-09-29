import { ImageProps } from '@kustomz/lib'
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
  const { getByAltText } = render(<Fluid {...(Fluid.args as ImageProps)} />)
  const { alt } = (Fluid.args || {}) as ArgsMatcher

  expect(getByAltText(alt)).toHaveClass('img-fluid')
})

it('renders a thumbnail image', () => {
  const { getByAltText } = render(
    <Thumbnail {...(Thumbnail.args as ImageProps)} />
  )

  const { alt } = (Thumbnail.args || {}) as ArgsMatcher

  expect(getByAltText(alt)).toHaveClass('img-thumbnail')
})
