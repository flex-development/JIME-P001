import type { IProductListingVariant } from '@core/types'
import { fireEvent, render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { stripHtml } from 'string-strip-html'
import { AddToCartForm } from '../AddToCartForm'
import { AshTray, Kustomz } from '../AddToCartForm.stories'
import KUSTOM_PRODUCT_DESCRIPTION from './__fixtures__/kpd'

/**
 * @file Integration Tests - AddToCartForm
 * @module lib/molecules/AddToCartForm/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

const {
  QUANTITY_LABEL,
  SELECT_PLACEHOLDER,
  TEXTAREA_PLACEHOLDER
} = AddToCartForm

describe('integration:AddToCartForm', () => {
  describe('initial state', () => {
    it('renders product description', () => {
      render(<AshTray {...AshTray.args} />)

      const description = stripHtml(AshTray.args.product.body_html).result

      // Expect that product description is rendered
      expect(screen.getByText(new RegExp(description, 'i'))).toBeInTheDocument()
    })

    it('renders product title', () => {
      render(<AshTray {...AshTray.args} />)

      const { title } = AshTray.args.product

      // Expect that product title is rendered
      expect(screen.getByText(new RegExp(title, 'i'))).toBeInTheDocument()
    })

    it('renders product variant image', () => {
      render(<AshTray {...AshTray.args} />)

      const { images, variants } = AshTray.args.product
      const { image_id } = variants[0]
      const { alt } = images.find(image => image.id === image_id) || {}

      // Expect that product variant image is rendered
      expect(screen.getByAltText(alt as string)).toBeInTheDocument()
    })

    it('renders product variant price', () => {
      render(<AshTray {...AshTray.args} />)

      const { price } = AshTray.args.product.variants[0]

      // Expect that product variant price is rendered
      expect(screen.getByText(new RegExp(price, 'i'))).toBeInTheDocument()
    })

    it('renders product variant title', () => {
      render(<AshTray {...AshTray.args} />)

      const title = AshTray.args.product.variants[0].title

      // Expect that product variant title is rendered
      expect(screen.getByText(new RegExp(title, 'i'))).toBeInTheDocument()
    })
  })

  describe('simulate user', () => {
    describe('select product variant', () => {
      it('triggers update: product title and carousel position', async () => {
        render(<AshTray {...AshTray.args} />)

        const { images, variants } = AshTray.args.product
        const { id, image_id, title } = variants[1]
        const { alt } = images.find(image => image.id === image_id) || {}

        // Get <select> element
        const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

        // ! Simulate user selecting product variant
        User.selectOptions(select, [`${id}`])

        // Expect data-selected to match title of selected variant
        expect(select).toHaveAttribute('data-selected', title)

        // Check that new product variant image is rendered
        expect(screen.getByAltText(alt as string)).toBeInTheDocument()
      })

      it('triggers update: product price', () => {
        const { variants } = Kustomz.args.product

        render(<Kustomz {...Kustomz.args} />)

        // Get <select> element
        const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

        // Get product variant with different price than default option
        const { id, price } = variants.find(({ price }) => {
          return price !== variants[0].price
        }) as IProductListingVariant

        // ! Simulate user selecting product variant
        User.selectOptions(select, [`${id}`])

        // Check that new price is rendered
        expect(screen.getByText(new RegExp(price, 'i'))).toBeInTheDocument()
      })

      it('disable submit button if unavailable variant is selected', () => {
        render(<AshTray {...AshTray.args} />)

        // Get unavailable product variant
        const { variants } = AshTray.args.product
        const variant = variants.find(v => v.available === false)

        // Get select element and add to cart button
        const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)
        const button = screen.getByRole('button', { name: /add to cart/i })

        // ! Simulate user selecting unavailable product variant
        User.selectOptions(select, [`${variant?.id}`])

        // Expect add to cart button to be disabled
        expect(button).toBeDisabled()
      })

      it('does not update carousel position if product has one image', () => {
        render(<Kustomz {...Kustomz.args} />)

        const { images, variants } = Kustomz.args.product

        // Get image descripton of first product variant
        const image = images.find(({ id }) => id === variants[0].image_id)

        // Get <select> element
        const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

        // ! Simulate user selecting second product variant
        User.selectOptions(select, [`${variants[1].id}`])

        // Expect default image to be visible because product has one image
        expect(screen.getByAltText(image?.alt as string)).toBeInTheDocument()
      })
    })

    it('update product description', () => {
      render(<Kustomz {...Kustomz.args} />)

      // Get <textarea> element
      const textarea = screen.getByPlaceholderText(TEXTAREA_PLACEHOLDER)

      // ! Simulate user entering kustom product description
      User.type(textarea as HTMLTextAreaElement, KUSTOM_PRODUCT_DESCRIPTION)

      // Expect product description to be updated
      expect(textarea).toHaveValue(KUSTOM_PRODUCT_DESCRIPTION)
    })

    describe('update product quantity', () => {
      it.skip('with arrow buttons', () => {
        render(<AshTray {...AshTray.args} />)

        const input = screen.getByLabelText(QUANTITY_LABEL)

        // ! Simulate product quantity update
        User.click(input)
        fireEvent.keyDown(input, { code: 'ArrowUp', key: 'ArrowUp' })

        // Expect element with new quanity as value to be in the document
        expect(input).toHaveValue('2')
      })
    })

    it('submit form', () => {
      const handleSubmit = jest.fn()

      render(<AshTray {...AshTray.args} handleSubmit={handleSubmit} />)

      // Get <button> element
      const button = screen.getByRole('button', { name: /add to cart/i })

      // ! Simulate user adding product variant to cart
      User.click(button)

      // Expect callback to fire
      expect(handleSubmit).toBeCalledTimes(1)
    })
  })
})
