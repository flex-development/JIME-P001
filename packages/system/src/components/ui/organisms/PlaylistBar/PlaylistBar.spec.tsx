import { render } from '@testing-library/react'
import { Default } from './PlaylistBar.stories'

/**
 * @file Tests - PlaylistBar
 * @module components/ui/organisms/PlaylistBar/spec
 */

describe('PlaylistBar', () => {
  it('renders with class "playlistbar"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('playlistbar')
  })
})
