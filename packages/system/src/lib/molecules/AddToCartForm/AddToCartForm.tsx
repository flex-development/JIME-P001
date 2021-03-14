import type { CheckoutLineItemInput } from '@kustomzcore/types'
import { useActiveIndex } from '@system/hooks/useActiveIndex'
import { useCheckoutLineItemInput } from '@system/hooks/useCheckoutLineItemInput'
import { useProductVariants } from '@system/hooks/useProductVariants'
import { AddThisToolbox } from '@system/lib/atoms/AddThisToolbox'
import { Box } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import { Form } from '@system/lib/atoms/Form'
import { Input } from '@system/lib/atoms/Input'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { ProductHeading } from '@system/lib/atoms/ProductHeading'
import { ProductImage } from '@system/lib/atoms/ProductImage'
import { Select } from '@system/lib/atoms/Select'
import { TextArea } from '@system/lib/atoms/TextArea'
import { Carousel } from '@system/lib/molecules/Carousel'
import { FormField } from '@system/lib/molecules/FormField'
import type { EventHandlers } from '@system/types'
import findIndex from 'lodash/findIndex'
import type { FC } from 'react'
import { useCallback } from 'react'
import type { AddToCartFormProps } from './AddToCartForm.props'

/**
 * @file Implementation - AddToCartForm
 * @module lib/molecules/AddToCartForm/impl
 */

/**
 * Renders a form that allows users to add a product (variant) to their cart. To
 * be used in the `ProductTemplate` component.
 *
 * Renders a `Form` component with the class `add-to-cart-form`.
 *
 * - https://shopify.dev/docs/storefront-api/reference/object/product
 * - https://shopify.dev/docs/storefront-api/reference/object/productvariant
 */
export const AddToCartForm: FC<AddToCartFormProps> & {
  QUANTITY_LABEL: string
  SELECT_PLACEHOLDER: string
  TEXTAREA_PLACEHOLDER: string
} = props => {
  const {
    active: position = 0,
    handleSubmit = (
      item: CheckoutLineItemInput,
      event: EventHandlers.Click.Button
    ) => {
      event.preventDefault()
      return setTimeout(() => {
        console.log('TODO: AddToCartForm.handleSubmit', item)
      }, 5000)
    },
    handleVariant,
    product,
    ...rest
  } = props

  // Carousel position state
  const { active, setIndex: setCarouselPosition } = useActiveIndex(position, {
    upperLimit: product.images.length - 1
  })

  // Use product variants as options
  const {
    options: product_variant_options,
    selectVariant,
    selected,
    variants
  } = useProductVariants(product.variants, position)

  // Initialize line item state
  // The item state will be passed to props.addToCart if the fn is defined
  const { item, updateProperties, updateQuantity } = useCheckoutLineItemInput({
    price: selected.price,
    product,
    properties: null,
    quantity: 1,
    variant_id: selected.id
  })

  /**
   * Updates the selected variant state and sets the carousel position to the
   * image of the new variant.
   *
   * @param {EventHandlers.Change.Select} event - `change` event
   * @return {void}
   */
  const onChangeVariant = (event: EventHandlers.Change.Select): void => {
    const variant_id = JSON.parse(event.target.value)
    const variant = variants.find(({ id }) => id === variant_id)

    const pos = findIndex(product.images, ({ id }) => {
      return id === variant?.image_id
    })

    selectVariant(variant_id)
    setCarouselPosition(pos)

    if (handleVariant) handleVariant(variant_id)
  }

  /* Callback version of `onChangeVariant` */
  const onChangeVariantCB = useCallback(onChangeVariant, [
    handleVariant,
    product.images,
    selectVariant,
    setCarouselPosition,
    variants
  ])

  /**
   * Updates the number of product variants to order.
   *
   * @param {EventHandlers.Change.Input} event - `change` event
   * @return {void}
   */
  const onChangeQuantity = (event: EventHandlers.Change.Input): void => {
    const value = JSON.parse(event.target.value)
    return updateQuantity(value < 1 ? 1 : value)
  }

  /* Callback version of `onChangeQuantity` */
  const onChangeQuantityCB = useCallback(onChangeQuantity, [updateQuantity])

  /**
   * Updates the custom properties for the product if the `props.product.handle`
   * is `kustomz`.
   *
   * @param {EventHandlers.Change.TextArea} event - `change` event
   * @return {void}
   */
  const onChangeProperties = (event: EventHandlers.Change.TextArea): void => {
    return updateProperties({ [event.target.name]: event.target.value })
  }

  /* Callback version of `onChangeProperties` */
  const onChangePropertiesCB = useCallback(onChangeProperties, [
    updateProperties
  ])

  /**
   * Updates the form submission state and calls `props.handleSubmit`.
   *
   * @param {EventHandlers.Click.Button} event - `click` event
   * @return {void}
   */
  const onClickSubmit = (event: EventHandlers.Click.Button): void => {
    event.preventDefault()
    if (handleSubmit) handleSubmit(item, event)
  }

  /* Callback version of `onClickSubmit` */
  const onClickSubmitCB = useCallback(onClickSubmit, [handleSubmit, item])

  return (
    <Form {...rest} className='add-to-cart-form'>
      <Box className='add-to-cart-form-col'>
        <Carousel
          className='add-to-cart-form-carousel'
          position={active < 0 ? 0 : active}
        >
          {product.images.map((image, index) => (
            <ProductImage
              $display='block'
              key={image.id}
              loading={index === active ? 'eager' : 'lazy'}
              product={product}
              variant={variants.find(({ image_id }) => image_id === image.id)}
            />
          ))}
        </Carousel>
      </Box>

      <Box className='add-to-cart-form-col'>
        {/* Product title and variant price */}
        <ProductHeading
          className='add-to-cart-form-heading'
          price={item.quantity * JSON.parse(selected.price)}
          title={product.title}
        />

        {/* Product description */}
        <Paragraph $form $html={product.body_html} />

        {/* Main form control container */}
        <Box className='add-to-cart-form-controls'>
          <Select
            $options={product_variant_options}
            aria-label='Product variant selection'
            className='add-to-cart-form-control'
            data-selected={selected.title}
            name='variant_id'
            onChange={onChangeVariantCB}
            placeholder='Select an option'
            value={selected.id}
          />

          <FormField
            className='add-to-cart-form-field'
            data-control='input'
            data-type='number'
            label='Quantity'
          >
            <Input
              aria-label='Product quantity'
              className='add-to-cart-form-control'
              min={0}
              onChange={onChangeQuantityCB}
              type='number'
              value={item.quantity}
            />
          </FormField>
        </Box>

        {/* Only visible for "KUSTOMZ" product - sync with Shopify */}
        <TextArea
          aria-label='Kustom product description'
          className='add-to-cart-form-control'
          disabled={product.handle !== 'kustomz'}
          hidden={product.handle !== 'kustomz'}
          onChange={onChangePropertiesCB}
          name='kpd'
          placeholder='Describe your kustom ash or rolling tray'
          value={item.properties?.kpd}
        />

        {/* Add to cart button container */}
        <Box className='add-to-cart-form-btn-container'>
          <AddThisToolbox className='add-to-cart-form-addthis-toolbox' />

          <Button
            $scale
            aria-label='Add to cart'
            className='add-to-cart-form-btn'
            disabled={!selected.available}
            name='add-to-cart'
            onClick={onClickSubmitCB}
            type='submit'
          >
            {selected.available ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Box>
      </Box>
    </Form>
  )
}

AddToCartForm.displayName = 'AddToCartForm'

AddToCartForm.QUANTITY_LABEL = 'Product quantity'
AddToCartForm.SELECT_PLACEHOLDER = 'Select an option'
AddToCartForm.TEXTAREA_PLACEHOLDER = 'Describe your kustom ash or rolling tray'

AddToCartForm.defaultProps = {
  active: 0
}
