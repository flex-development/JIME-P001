import { ProductImage } from '@system/lib/atoms/ProductImage'
import PRODUCT from '@system/tests/fixtures/api/products/rolling-tray'

/**
 * @file Test Fixture - ProductImage component array
 * @module lib/molecules/Carousel/tests/fixtures/product-image-components
 */

export default PRODUCT.images.map(({ id }) => (
  <ProductImage
    $display='block'
    id={`${id}`}
    key={id}
    product={PRODUCT}
    variant={PRODUCT.variants.find(({ image_id }) => image_id === id)}
  />
))
