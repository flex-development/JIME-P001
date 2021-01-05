import { CheckoutLineItemInput } from '@flex-development/kustomzcore'
import {
  useActiveIndex,
  useCheckoutLineItemInput,
  useProductImages,
  useProductVariants
} from '@system/hooks'
import {
  Box,
  Button,
  Form,
  Image,
  Input,
  Paragraph,
  ProductHeading,
  Select,
  TextArea
} from '@system/lib/atoms'
import { EventHandlers } from '@system/types'
import { findIndex } from 'lodash'
import { FC, useCallback } from 'react'
import { Carousel } from '../Carousel'
import { FormField } from '../FormField'
import { AddToCartFormProps } from './AddToCartForm.props'

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

  // Use product images as carousel slides
  const images = useProductImages(product)

  // Use product variants as options
  const {
    options: product_variant_options,
    selectVariant,
    selected = {},
    variants
  } = useProductVariants(product.variants, position)

  // Initialize line item state
  // The item state will be passed to props.addToCart if the fn is defined
  const { item, updateProperties, updateQuantity } = useCheckoutLineItemInput({
    data: {
      price: selected.price,
      properties: null,
      quantity: 1,
      title: `${product.title} - ${selected.title}`,
      variant_id: selected.id
    },
    image: images.find(image => image.id === selected?.image_id) || {}
  })

  // Carousel position state
  const { active, setIndex: setCarouselPosition } = useActiveIndex(position, {
    upperLimit: product.images.length - 1
  })

  /**
   * Updates the selected variant state and sets the carousel position to the
   * image of the new variant.
   *
   * @param event - `change` event from `<select>` element
   */
  const onChangeVariant = (event: EventHandlers.Change.Select) => {
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
   * @param event - `change` event from `<input>` element
   */
  const onChangeQuantity = (event: EventHandlers.Change.Input) => {
    const value = JSON.parse(event.target.value)
    return updateQuantity(value < 1 ? 1 : value)
  }

  /* Callback version of `onChangeQuantity` */
  const onChangeQuantityCB = useCallback(onChangeQuantity, [updateQuantity])

  /**
   * Updates the custom properties for the product if the `props.product.handle`
   * is `kustomz`.
   *
   * @param event - `change` event from `<textarea>` element
   */
  const onChangeProperties = (event: EventHandlers.Change.TextArea) => {
    return updateProperties({ [event.target.name]: event.target.value })
  }

  /* Callback version of `onChangeProperties` */
  const onChangePropertiesCB = useCallback(onChangeProperties, [
    updateProperties
  ])

  /**
   * Updates the form submission state and calls `props.handleSubmit`.
   *
   * @param e - `click` event from `<button>` element
   */
  const onClickSubmit = (e: EventHandlers.Click.Button) => {
    e.preventDefault()
    if (handleSubmit) handleSubmit(item, e)
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
          {images.map((image, index) => (
            <Image
              {...image}
              $display='block'
              $fluid
              key={image.id}
              loading={index === active ? 'eager' : 'lazy'}
            />
          ))}
        </Carousel>
      </Box>

      <Box className='add-to-cart-form-col'>
        {/* Product title and variant price */}
        <ProductHeading
          className='add-to-cart-form-heading'
          price={item.data.quantity * selected.price}
          title={product.title}
        />

        {/* Product description */}
        <Paragraph $form $html={product.body_html} />

        {/* Main form control container */}
        <Box className='add-to-cart-form-controls'>
          <Select
            $form
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
              value={item.data.quantity}
            />
          </FormField>
        </Box>

        {/* Only visible for "KUSTOMZ" product - sync with Shopify */}
        <TextArea
          $form
          aria-label='Kustom product description'
          className='add-to-cart-form-control'
          disabled={product.handle !== 'kustomz'}
          hidden={product.handle !== 'kustomz'}
          onChange={onChangePropertiesCB}
          name='kpd'
          placeholder='Describe your kustom ash or rolling tray'
          value={item.data.properties?.kpd}
        />

        {/* Add to cart button container */}
        <Box className='add-to-cart-form-btn-container'>
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
