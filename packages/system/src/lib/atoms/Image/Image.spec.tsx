import { render } from '@testing-library/react'
import { Default, Fluid } from './Image.stories'

/**
 * @file Tests - Image
 * @module lib/atoms/Image/spec
 */

describe('Image', () => {
  it('renders an <img> element', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild?.nodeName.toLowerCase()).toBe('img')
  })

  it('renders with class "img-fluid"', () => {
    const { getByAltText } = render(<Fluid {...Fluid.args} />)
    const { alt } = Fluid.args

    expect(getByAltText(alt as string)).toHaveClass('img-fluid')
  })
})
