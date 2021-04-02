import { render } from '@testing-library/react'
import { InlineFollow, InlineShare } from '../AddThisToolbox.stories'

/**
 * @file Unit Tests - AddThisToolbox
 * @module lib/atoms/AddThisToolbox/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:AddThisToolbox', () => {
  describe('props', () => {
    describe('type', () => {
      it('renders with class "addthis_inline_follow_toolbox"', () => {
        const { container } = render(<InlineFollow {...InlineFollow.args} />)

        const className = 'addthis_inline_follow_toolbox'

        expect(container.firstChild).toHaveClass(className)
      })

      it('renders with class "addthis_inline_share_toolbox"', () => {
        const { container } = render(<InlineShare {...InlineShare.args} />)

        const className = 'addthis_inline_share_toolbox'

        expect(container.firstChild).toHaveClass(className)
      })
    })
  })
})
