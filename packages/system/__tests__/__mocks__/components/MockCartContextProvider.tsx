import ITEMS from '@system-mocks/data/checkout-line-items.mock.json'
import { CartContextProvider } from '@system/components/context'

/**
 * @file Mock `CartContextProvider` component
 * @module tests/mocks/MockCartContextProvider
 */

export const MockCartContextProvider: typeof CartContextProvider = props => {
  return <CartContextProvider {...props} items={props.items || ITEMS} />
}
