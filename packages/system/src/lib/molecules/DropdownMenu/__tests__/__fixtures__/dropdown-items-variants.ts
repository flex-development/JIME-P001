import { ListProps } from '@system/lib/atoms/List'
import PRODUCT from '@system/tests/fixtures/api/products/rolling-tray'

/**
 * @file Test Fixture - DropdownMenu Items (Product Variants)
 * @module lib/molecules/DropdownMenu/tests/fixtures/dropdown-items-variants
 */

export default PRODUCT.variants.map(({ id, title }) => ({
  $dropdown: true,
  children: title,
  'data-variant': id
})) as ListProps['$items']
