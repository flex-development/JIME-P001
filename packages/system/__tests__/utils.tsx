import type { CartContextProviderProps } from '@system/providers'
import { CartContextProvider } from '@system/providers'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import ITEMS from './__fixtures__/checkout-line-items'

/**
 * @file Global Testing Utilities
 * @module tests/utils
 */

/**
 * Renders a test component wrapped in the `CartContextProvider`.
 *
 * @param {ReactElement} [ui] - Component to render
 * @param {CartContextProviderProps} [props] - `CartContextProvider` properties
 * @param {RenderOptions} [options] - Render options
 * @return {RenderResult} Render result
 */
export const renderWithCartContextProvider = (
  ui: ReactElement = <>{null}</>,
  props: CartContextProviderProps = {},
  options: RenderOptions = {}
): ReturnType<typeof render> => {
  const $props = { ...props, children: ui, items: props.items || [...ITEMS] }

  return render(<CartContextProvider {...$props} />, options)
}
