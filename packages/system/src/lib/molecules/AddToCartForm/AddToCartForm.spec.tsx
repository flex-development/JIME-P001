import type { IProductListingVariant } from '@kustomzcore/types'
import { fireEvent, render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { AddToCartForm } from './AddToCartForm'
import { AshTray, Kustomz } from './AddToCartForm.stories'

/**
 * @file Tests - AddToCartForm
 * @module lib/molecules/AddToCartForm/spec
 */

const {
  QUANTITY_LABEL,
  SELECT_PLACEHOLDER,
  TEXTAREA_PLACEHOLDER
} = AddToCartForm

describe('AddToCartForm', () => {
  it('renders with class "add-to-cart-form"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container.firstChild).toHaveClass('add-to-cart-form')
  })

  it('only displays <textarea> element for "KUSTOMZ" product', () => {
    render(<AshTray {...AshTray.args} />)

    const element = screen.getByPlaceholderText(TEXTAREA_PLACEHOLDER)
    expect(element).toHaveAttribute('hidden', '')
  })

  it('updates selected variant', () => {
    render(<AshTray {...AshTray.args} />)

    // Get <select> element
    const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

    // Expect <select> element to be rendered
    expect(select).toBeInTheDocument()

    // Get last product variant
    const { variants } = AshTray.args.product
    const variant = variants[variants.length - 1]

    // Mock product variant selection
    User.selectOptions(select, [`${variant.id}`])

    // Expect data-selected to match title of selected variant
    expect(select).toHaveAttribute('data-selected', variant.title)
  })

  it('updates carousel position when new variant is selected', () => {
    render(<AshTray {...AshTray.args} />)

    const { title, variants } = AshTray.args.product

    // Get <select> element
    const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

    // Get last product variant
    const default_variant = variants[0]
    const v_pos = variants.length - 1
    const variant = variants[v_pos]

    // Expect default image to be visible
    expect(
      screen.getByAltText(`${title} - ${default_variant.title}`)
    ).toBeInTheDocument()

    // Mock product variant selection
    User.selectOptions(select, [`${variant.id}`])

    // Expect image of selected variant to be visible
    expect(
      screen.getByAltText(`${title} - ${variant.title}`)
    ).toBeInTheDocument()
  })

  it('does not update carousel position if product has one image', () => {
    render(<Kustomz {...Kustomz.args} />)

    const { title, variants } = Kustomz.args.product

    const variant = variants[0]
    const alt = `${title} - ${variant.title}`

    const visible = () => {
      expect(screen.getByAltText(alt)).toBeInTheDocument()
    }

    // Get <select> element
    const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

    // Expect default image to be visible
    visible()

    // Mock product variant selection
    User.selectOptions(select, [`${variant.id}`])

    // Expect default image to be visible because product has one image
    visible()
  })

  it('disables the add to cart button when an unavailable product variant is selected', () => {
    render(<AshTray {...AshTray.args} />)

    // Get unavailable product variant
    const { variants } = AshTray.args.product
    const variant = variants.find(v => v.available === false) || {}

    // Mock user selection
    User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
      `${(variant as IProductListingVariant).id}`
    ])

    // Expect add to cart button to be disabled
    // ! Keep in sync with button's aria-label property
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeDisabled()
  })

  // FIXME: Component passes manual tests (check state), but fails otherwise
  it('[FALSE ALARM] updates the product quantity', () => {
    render(<AshTray {...AshTray.args} />)

    const input = screen.getByLabelText(QUANTITY_LABEL)

    // Mock product quantity update
    User.click(input)
    fireEvent.keyPress(input, { key: 'ArrowUp' })

    // Expect element with new quanity as value to be in the document
    expect((input as HTMLInputElement).value).toBe('2')
  })

  it('updates the display price if the selected option has a different price than the previous option', () => {
    const { getByText } = render(<Kustomz {...Kustomz.args} />)
    const { variants } = Kustomz.args.product

    // Get default product variant
    const variant = variants[0]

    // Expect price of default variant is shown
    expect(getByText(`$${variant.price}`)).toBeInTheDocument()

    // Get product variant with different price than default option
    const variant2 = variants.find(v => {
      return v.price !== variant.price
    }) as IProductListingVariant

    // Mock user selection
    User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
      `${variant2.id}`
    ])

    // Expect new price to be displayed
    expect(getByText(`$${variant2.price}`)).toBeInTheDocument()
  })

  it('updates the kustom product description', () => {
    render(<Kustomz {...Kustomz.args} />)

    // Mock kustom product description
    const KUSTOM_PRODUCT_DESCRIPTION = 'Kustom product description'

    // Get textarea element
    const textarea = screen.getByPlaceholderText(
      TEXTAREA_PLACEHOLDER
    ) as HTMLTextAreaElement

    // Mock user entering description
    User.type(textarea, KUSTOM_PRODUCT_DESCRIPTION)

    // Expect product description to be updated
    expect(textarea.value).toBe(KUSTOM_PRODUCT_DESCRIPTION)
  })
})
