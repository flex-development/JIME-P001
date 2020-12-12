import { LinkProps } from '@system/components/atoms'
import { Matcher, render } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { Default } from './Sidebar.stories'

/**
 * @file Tests - Sidebar
 * @module components/organisms/Sidebar/spec
 */

const SidebarDefaults = Sidebar.defaultProps as ArgsMatcher

it('renders <aside class="sidebar">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('sidebar')
})

it('displays the profile age', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(`${SidebarDefaults.age} years old`)).toBeInTheDocument()
})

it('displays the profile image', () => {
  const { getByAltText } = render(<Default {...Default.args} />)

  const { img } = SidebarDefaults

  expect(getByAltText('Profile image for Morena')).toHaveAttribute('src', img)
})

it('displays the profile location', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(SidebarDefaults.location)).toBeInTheDocument()
})

it('displays the profile mood', () => {
  const { getByText } = render(<Default {...Default.args} />)

  expect(getByText(`Mood: ${SidebarDefaults.mood}`)).toBeInTheDocument()
})

it('displays the sidebar menu links', () => {
  const { getByText } = render(<Default {...Default.args} />)

  Default.args.menu?.forEach((link: LinkProps) => {
    expect(getByText(link.title as Matcher)).toHaveClass('nav-link')
  })
})
