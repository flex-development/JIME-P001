import { render, screen } from '@testing-library/react'
import { Dialog } from '../Dialog'
import { Open } from '../Dialog.stories'

/**
 * @file Unit Tests - Dialog
 * @module lib/atoms/Dialog/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Dialog', () => {
  describe('html', () => {
    it('renders <dialog> element', () => {
      const { container } = render(<Dialog />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('dialog')
    })
  })

  describe('props', () => {
    describe('open', () => {
      it('renders inner content', () => {
        render(<Open {...Open.args} />)

        const matcher = Open.args.children as string

        expect(screen.getByText(matcher)).toBeInTheDocument()
      })
    })
  })
})
