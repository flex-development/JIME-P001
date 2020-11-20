import { CartTemplate } from '@flex-development/kustomzdesign'
import { NextComponentType, NextPageContext } from 'next'
import React from 'react'

/**
 * @file Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 *
 * @todo Implement technical functionality
 */
const Cart: NextComponentType<NextPageContext> = () => {
  return <CartTemplate items={[]} />
}

export default Cart
