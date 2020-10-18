import { LinkProps, Sidebar } from '@system/lib'
import { Default } from '@system/stories/lib/organisms/Sidebar.stories'
import { Matcher, render } from '@testing-library/react'
import React from 'react'
import { ArgsMatcher } from '../../jest-env'

/**
 * @file Tests - Sidebar
 * @module tests/lib/organisms/Sidebar
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
