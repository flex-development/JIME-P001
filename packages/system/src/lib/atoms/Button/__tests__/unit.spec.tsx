import { COLORS } from '@system/config/constants'
import type { Color } from '@system/types'
import { fireEvent, render } from '@testing-library/react'
import { ButtonProps } from '../Button.props'
import { Default, Disabled, Fluid, Scale } from '../Button.stories'

/**
 * @file Unit Tests - Button
 * @module lib/atoms/Button/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Button', () => {
  describe('html', () => {
    it('renders <button> element with class "btn"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('button')
      expect(container.firstChild).toHaveClass('btn')
    })

    it('renders disabled <button> element', () => {
      const { container } = render(<Disabled {...Disabled.args} />)

      expect(container.firstChild).toBeDisabled()
      expect(container.firstChild).toHaveAttribute('aria-disabled')
    })
  })

  describe('props', () => {
    describe('$fluid', () => {
      it('renders with class "btn-fluid"', () => {
        const { container } = render(<Fluid {...Fluid.args} />)

        expect(container.firstChild).toHaveClass('btn-fluid')
      })
    })

    describe('$scale', () => {
      it('renders with class "btn-transform-scale"', () => {
        const { container } = render(<Scale {...Scale.args} />)

        expect(container.firstChild).toHaveClass('btn-transform-scale')
      })
    })

    describe('$variant', () => {
      it('renders with background utility class', () => {
        COLORS.forEach((color: Color) => {
          const props: ButtonProps = { ...Default.args, $variant: color }
          const { container } = render(<Default {...props} />)

          expect(container.firstChild).toHaveClass(`btn-${props.$variant}`)
        })
      })
    })
  })

  describe('callbacks', () => {
    describe('calls onClick', () => {
      const onClick: jest.Mock<ButtonProps['onClick']> = jest.fn()

      beforeEach(() => {
        onClick.mockClear()
      })

      it('when `props.$scale` is falsy', () => {
        const props = { ...Default.args, onClick }

        const { getByRole } = render(<Default {...props} />)

        const name = new RegExp(Default.args.children as string, 'i')

        fireEvent.click(getByRole('button', { name }))

        expect(onClick).toHaveBeenCalledTimes(1)
      })

      it('when `props.$scale` is truthy', () => {
        const props = { ...Scale.args, onClick }

        const { getByRole } = render(<Scale {...props} />)

        const name = new RegExp(Scale.args.children as string, 'i')

        fireEvent.click(getByRole('button', { name }))

        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })
  })
})
