import { render } from '@testing-library/react'
import { Image } from './Image'
import { Fluid, Thumbnail } from './Image.stories'

/**
 * @file Tests - Image
 * @module components/ui/atoms/Image/spec
 */

describe('Image', () => {
  it('renders an <img> element', () => {
    const { container } = render(<Image />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('img')
  })

  it('renders with class "img-fluid"', () => {
    const { getByAltText } = render(<Fluid {...Fluid.args} />)
    const { alt } = Fluid.args

    expect(getByAltText(alt as string)).toHaveClass('img-fluid')
  })

  it('renders with class "img-thumbnail"', () => {
    const { getByAltText } = render(<Thumbnail {...Thumbnail.args} />)

    const { alt } = Thumbnail.args

    expect(getByAltText(alt as string)).toHaveClass('img-thumbnail')
  })
})
