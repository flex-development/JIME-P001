import { fireEvent, render, screen } from '@testing-library/react'
import { Default } from '../ShopHeader.stories'

/**
 * @file Unit Tests - ShopHeader
 * @module lib/organisms/ShopHeader/tests/unit
 */

describe('unit:ShopHeader', () => {
  describe('html', () => {
    it('renders <header> element with class "shop-header"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('header')
      expect(container.firstChild).toHaveClass('shop-header')
    })
  })

  describe('callbacks', () => {
    it('calls handleSidebar', () => {
      const handleSidebar = jest.fn()

      render(<Default {...Default.args} handleSidebar={handleSidebar} />)

      // ! Mock clicking sidebar <button> element
      fireEvent.click(screen.getByRole('button', { name: /sidebar/i }))

      // Expect handleSidebar callback to fire
      expect(handleSidebar).toBeCalledTimes(1)
    })
  })
})
