import { render } from '@testing-library/react'
import { Fluid, Thumbnail } from './Image.stories'

/**
 * @file Tests - Image
 * @module components/ui/atoms/Image/spec
 */

it('renders a fluid image', () => {
  const { getByAltText } = render(<Fluid {...Fluid.args} />)
  const { alt } = Fluid.args as ArgsMatcher

  expect(getByAltText(alt)).toHaveClass('img-fluid')
})

it('renders a thumbnail image', () => {
  const { getByAltText } = render(<Thumbnail {...Thumbnail.args} />)

  const { alt } = Thumbnail.args as ArgsMatcher

  expect(getByAltText(alt)).toHaveClass('img-thumbnail')
})
