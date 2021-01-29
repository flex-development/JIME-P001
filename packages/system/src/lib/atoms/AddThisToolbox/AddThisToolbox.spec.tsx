import { render } from '@testing-library/react'
import { InlineFollow, InlineShare } from './AddThisToolbox.stories'

/**
 * @file Tests - AddThisToolbox
 * @module lib/atoms/AddThisToolbox/spec
 */

describe('AddThisToolbox', () => {
  describe('InlineFollow', () => {
    it('renders with class "addthis_inline_follow_toolbox"', () => {
      const { container } = render(<InlineFollow {...InlineFollow.args} />)
      expect(container.firstChild).toHaveClass('addthis_inline_follow_toolbox')
    })
  })

  describe('InlineShare', () => {
    it('renders with class "addthis_inline_share_toolbox"', () => {
      const { container } = render(<InlineShare {...InlineShare.args} />)
      expect(container.firstChild).toHaveClass('addthis_inline_share_toolbox')
    })
  })
})
