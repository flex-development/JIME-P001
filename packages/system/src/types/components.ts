import { AnyObject } from '@flex-development/json/utils/types'
import { AnimatedComponent } from '@react-spring/web'
import { ElementType, FC, ForwardRefExoticComponent, SVGProps } from 'react'
import { ComponentPropsBase } from './props'

/**
 * @file Type Definitions - Components
 * @module types/components
 */

/**
 * `AnimatedComponent` type alias.
 */
export type AC<T extends ElementType> = AnimatedComponent<T>

/* eslint-disable prettier/prettier */

/**
 * The type of an `animated()` component.
 */
export type AnimatedFREC<
  T extends AnyObject | string
> = T extends keyof JSX.IntrinsicElements
  ? AnimatedComponent<T>
  : AnimatedComponent<FC<T>>

/* eslint-enable prettier/prettier */

/**
 * `ForwardRefExoticComponent` type alias.
 */
export type FREC<T extends AnyObject = AnyObject> = ForwardRefExoticComponent<T>

/**
 * Shopify Polaris Icon
 */
export type ShopifyPolarisIcon = FC<SVGProps<SVGSVGElement>>

/**
 * `TemplateComponent` type alias.
 */
export type TC<P = ComponentPropsBase> = TemplateComponent<P>

/**
 * Template component properties.
 */
export type TemplateComponent<P = ComponentPropsBase> = FC<P> & {
  template_id: string
}