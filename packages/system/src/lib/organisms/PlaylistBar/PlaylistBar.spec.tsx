import { render } from '@testing-library/react'
import { Default } from './PlaylistBar.stories'

/**
 * @file Tests - PlaylistBar
 * @module lib/organisms/PlaylistBar/spec
 */

describe('PlaylistBar', () => {
  it('renders with class "playlist-bar"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('playlist-bar')
  })
})
