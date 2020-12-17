import { ANYTHING } from '@flex-development/json'
import {
  CheckoutLineItemInput,
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore'
import {
  Button,
  Column,
  FlexBox,
  Form,
  FormProps,
  Paragraph,
  Row,
  Select,
  TextArea
} from '@system/components/ui/atoms'
import {
  LabeledFormControl,
  ProductHeading
} from '@system/components/ui/molecules'
import {
  useActiveIndex,
  useCheckoutLineItemInput,
  useProductVariants
} from '@system/hooks'
import { EventHandlers } from '@system/types'
import { getProductVariantImage } from '@system/utils'
import { findIndex, isEmpty } from 'lodash'
import { FC, useCallback } from 'react'
import { ProductImageCarousel } from '../ProductImageCarousel'

/**
 * @file Form allowing users to add products to their cart
 * @module components/ui/organisms/AddToCartForm/impl
 */

export interface AddToCartFormProps extends FormProps {
  /**
   * Index position of the carousel slide to display first.
   *
   * @default 0
   */
  active?: number

  /**
   * Form submission handler. If a submit handler isn't passed the result will
   * be logged to the console.
   */
  handleSubmit?(
    item: CheckoutLineItemInput,
    event: EventHandlers.Click.Button
  ): ANYTHING

  /**
   * Fires when a product variant is selected.
   */
  handleVariant?(id: IProductListingVariant['id']): ANYTHING

  /**
   * Shopify product listing resource.
   */
  product: IProductListing
}

/**
 * Renders a form that allows users to add a product (variant) to their cart. To
 * be used in the `ProductTemplate` component.
 *
 * - https://shopify.dev/docs/storefront-api/reference/object/product
 * - https://shopify.dev/docs/storefront-api/reference/object/productvariant
 */
export const AddToCartForm: FC<AddToCartFormProps> & {
  QUANTITY_LABEL: string
  SELECT_PLACEHOLDER: string
  TEXTAREA_PLACEHOLDER: string
} = (props: AddToCartFormProps) => {
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

  // Toggle styles based on product description length
  const no_description = isEmpty(product.body_html)

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
    image: getProductVariantImage(
      selected?.image_id || null,
      product.images,
      `${product.title} - ${selected.title}`
    )
  })

  // Carousel position state
  const { active, setIndex: setCarouselPosition } = useActiveIndex(position, {
    upperLimit: product.images.length - 1
  })

  /**
   * Updates the selected variant state and sets the carousel position to the
   * image of the new variant.
   *
   * @param e - `change` event from `<select>` element
   */
  const onChangeVariant = (e: EventHandlers.Change.Select) => {
    const variant_id = JSON.parse(e.target.value)
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
   * @param e - `change` event from `<input>` element
   */
  const onChangeQuantity = (e: EventHandlers.Change.Input) => {
    const value = JSON.parse(e.target.value)
    return updateQuantity(value < 1 ? 1 : value)
  }

  /* Callback version of `onChangeQuantity` */
  const onChangeQuantityCB = useCallback(onChangeQuantity, [updateQuantity])

  /**
   * Updates the custom properties for the product if the `props.product.handle`
   * is `kustomz`.
   *
   * @param e - `change` event from `<textarea>` element
   */
  const onChangeProperties = (e: EventHandlers.Change.TextArea) => {
    return updateProperties({ [e.target.name]: e.target.value })
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
    if (handleSubmit) handleSubmit(item, e)
  }

  /* Callback version of `onClickSubmit` */
  const onClickSubmitCB = useCallback(onClickSubmit, [handleSubmit, item])

  return (
    <Form {...rest} className='add-to-cart-form'>
      <Row
        align={{ md: 'center' }}
        className='mw-100 pl-0-first pr-0-last'
        md={2}
        xs={1}
      >
        <Column mb={{ md: 0, xs: 36 }} md={4} xs>
          <ProductImageCarousel
            images={product.images}
            position={active < 0 ? 0 : active}
            product_title={product.title}
            variants={product.variants}
          />
        </Column>
        <Column md={8} xs>
          {/* Product title and variant price */}
          <ProductHeading
            className='h2'
            mb={no_description ? 16 : 4}
            price={item.data.quantity * selected.price}
            title={product.title}
          />

          {/* Product description */}
          {!no_description && (
            <Paragraph
              className='form-text'
              innerHTML={product.body_html}
              mb={12}
            />
          )}

          {/* Main form control container */}
          <FlexBox
            align={{ sm: 'center' }}
            direction={{ sm: 'row', xs: 'column' }}
            justify={{ sm: 'between' }}
          >
            <Select
              aria-label='Product variant selection'
              data-selected={selected.title}
              name='variant_id'
              onChange={onChangeVariantCB}
              options={product_variant_options}
              placeholder='Select an option'
              value={selected.id}
            />

            <LabeledFormControl
              control={{
                'aria-label': 'Product quantity',
                min: 0,
                onChange: onChangeQuantityCB,
                type: 'number',
                value: item.data.quantity
              }}
            >
              Quantity
            </LabeledFormControl>
          </FlexBox>

          {/* Only visible for "KUSTOMZ" product - sync with Shopify */}
          <Row fluid mt={16} hidden={product.handle !== 'kustomz'}>
            <TextArea
              aria-label='Kustom product description'
              disabled={product.handle !== 'kustomz'}
              onChange={onChangePropertiesCB}
              name='kpd'
              placeholder='Describe your kustom ash or rolling tray'
              value={item.data.properties?.kpd}
            />
          </Row>

          {/* Add to cart button container */}
          <FlexBox align='center' justify='end' mt={24}>
            <Button
              aria-label='Add to cart'
              className='w-sm-auto w-100'
              disabled={!selected.available}
              name='add-to-cart'
              onClick={onClickSubmitCB}
              scale
              type='submit'
            >
              {selected.available ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </FlexBox>
        </Column>
      </Row>
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
