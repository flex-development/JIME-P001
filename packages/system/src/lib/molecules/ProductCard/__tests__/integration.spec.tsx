import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AshTray, Kustomz } from '../ProductCard.stories'

/**
 * @file Integration Tests - ProductCard
 * @module lib/molecules/ProductCard/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:ProductCard', () => {
  const { images, variants } = AshTray.args.product

  const variant = variants[0]
  const variant2 = variants[2]

  const vname = new RegExp(variant.title, 'i')
  const vname2 = new RegExp(variant2.title, 'i')

  /**
   * Simulates user opening `ProductCard` dropdown menu and clicking the second
   * option in the menu.
   *
   * @param {RegExp | string} [matcher] - Name of first option
   * @param {RegExp | string} [matcher2] - Name of second option
   * @return {Record<'element' | 'element2', HTMLElement>} Link elements
   */
  const mockDropdownOpenAndSelect = (
    matcher: RegExp | string = vname,
    matcher2: RegExp | string = vname2
  ): Record<'element' | 'element2', HTMLElement> => {
    const element = screen.getByText(matcher)
    const element2 = screen.getByText(matcher2)

    fireEvent.click(element)
    fireEvent.click(element2)

    return { element, element2 }
  }

  describe('simulate user', () => {
    describe('select product variant', () => {
      it('triggers update: product price', () => {
        render(<Kustomz {...Kustomz.args} />)

        const variant = Kustomz.args.product.variants[0]
        const variant2 = Kustomz.args.product.variants[1]

        const name = new RegExp(variant.title, 'i')
        const name2 = new RegExp(variant2.title, 'i')

        const price2 = new RegExp(variant2.price, 'i')

        // ! Simulate opening dropdown menu and click second option
        mockDropdownOpenAndSelect(name, name2)

        // Expect price for second option to be shown
        expect(screen.getByText(price2)).toBeInTheDocument()
      })

      it.skip('triggers update: product variant image', async () => {
        const image2 = images.find(({ id }) => id === variant2.image_id)

        render(<AshTray {...AshTray.args} />)

        // ! Simulate opening dropdown menu and click second option
        mockDropdownOpenAndSelect()

        // Expect image for second option to be shown
        await waitFor(() => {
          expect(screen.getByAltText(image2?.alt as string)).toBeInTheDocument()
        })
      })

      it.skip('triggers update: product variant title', async () => {
        render(<AshTray {...AshTray.args} />)

        // ! Simulate opening dropdown menu and click second option
        const { element, element2 } = mockDropdownOpenAndSelect()

        // Expect first option to be hidden and second to be visible
        await waitFor(() => {
          expect(element).not.toBeInTheDocument()
          expect(element2).toBeInTheDocument()
        })
      })
    })
  })
})
