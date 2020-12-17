import { LinkProps } from '@system/components/ui/atoms'
import { Matcher, render } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { Default } from './Sidebar.stories'

/**
 * @file Tests - Sidebar
 * @module components/ui/organisms/Sidebar/spec
 */

const DEFAULT_PROPS = Sidebar.defaultProps as ArgsMatcher

describe('Sidebar', () => {
  it('renders with class "sidebar"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('sidebar')
  })

  it('displays the profile age', () => {
    const { getByText } = render(<Default {...Default.args} />)

    expect(getByText(`${DEFAULT_PROPS.age} years old`)).toBeInTheDocument()
  })

  it('displays the profile image', () => {
    const { getByAltText } = render(<Default {...Default.args} />)

    const { img } = DEFAULT_PROPS

    expect(getByAltText('Profile image for Morena')).toHaveAttribute('src', img)
  })

  it('displays the profile location', () => {
    const { getByText } = render(<Default {...Default.args} />)

    expect(getByText(DEFAULT_PROPS.location)).toBeInTheDocument()
  })

  it('displays the profile mood', () => {
    const { getByText } = render(<Default {...Default.args} />)

    expect(getByText(`Mood: ${DEFAULT_PROPS.mood}`)).toBeInTheDocument()
  })

  it('displays the sidebar menu links', () => {
    const { getByText } = render(<Default {...Default.args} />)

    Default.args.menu?.forEach((link: LinkProps) => {
      expect(getByText(link.title as Matcher)).toHaveClass('nav-link')
    })
  })
})
