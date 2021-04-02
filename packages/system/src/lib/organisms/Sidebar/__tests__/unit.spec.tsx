import type { LinkProps } from '@system/lib/atoms/Link'
import { render, screen } from '@testing-library/react'
import { Sidebar } from '../Sidebar'
import type { SidebarProps } from '../Sidebar.props'
import { Default } from '../Sidebar.stories'

/**
 * @file Unit Tests - Sidebar
 * @module lib/organisms/Sidebar/tests/unit
 */

describe('unit:Sidebar', () => {
  describe('html', () => {
    it('renders <aside> element with class "sidebar"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('aside')
      expect(container.firstChild).toHaveClass('sidebar')
    })
  })

  describe('props', () => {
    const {
      age = -1,
      img = '',
      location = '',
      menu = [],
      mood = ''
    } = Sidebar.defaultProps as Partial<SidebarProps>

    describe('age', () => {
      it('renders profile age', () => {
        render(<Default {...Default.args} />)

        const element = screen.getByText(new RegExp(`${age}`, 'i'))

        expect(element).toHaveClass('sidebar-profile-age')
      })
    })

    describe('img', () => {
      it('renders profile image', () => {
        render(<Default {...Default.args} />)

        const element = screen.getByAltText(/profile/i)

        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('src', img)
      })
    })

    describe('location', () => {
      it('renders profile location', () => {
        render(<Default {...Default.args} />)

        const element = screen.getByText(new RegExp(`${location}`, 'i'))

        expect(element).toHaveClass('sidebar-profile-location')
      })
    })

    describe('menu', () => {
      it('renders sidebar menu links', () => {
        render(<Default {...Default.args} />)

        menu.forEach(({ title = '' }: LinkProps) => {
          const element = screen.getByRole('link', { name: new RegExp(title) })

          expect(element).toHaveClass('menu-link')
        })
      })
    })

    describe('mood', () => {
      it('renders profile mood', () => {
        render(<Default {...Default.args} />)

        const element = screen.getByText(new RegExp(`${mood}`, 'i'))

        expect(element).toHaveClass('sidebar-profile-mood')
      })
    })
  })
})
