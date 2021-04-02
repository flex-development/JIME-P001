import { render } from '@testing-library/react'
import type { HeadingProps } from '../Heading.props'
import { Default } from '../Heading.stories'

/**
 * @file Unit Tests - Heading
 * @module lib/atoms/Heading/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Heading', () => {
  describe('html', () => {
    const LEVELS: HeadingProps['$size'][] = [1, 2, 3, 4, 5, 6]
    const props = { ...Default.args }

    it('renders each heading level', () => {
      LEVELS.forEach(level => {
        const { container } = render(<Default {...props} $size={level} />)
        expect(container.firstChild?.nodeName.toLowerCase()).toBe(`h${level}`)
      })
    })
  })
})
