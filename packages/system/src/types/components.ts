import type { AnyObject } from '@flex-development/json/utils/types'
import type { AnimatedComponent } from '@react-spring/web'
import type {
  ElementType,
  FC,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps
} from 'react'
import type { ComponentPropsBase } from './props'
import type { HTMLElements } from './utils'

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
 *
 * @template P - Props type
 */
export type FREC<P extends AnyObject = AnyObject> = ForwardRefExoticComponent<P>

/* eslint-disable prettier/prettier */

/**
 * Return type of `forwardRef`.
 *
 * @template P - Props type
 * @template T - HTML tag name, i.e `div` or `button`
 */
export type ForwardRefReturn<
  P extends AnyObject = AnyObject,
  T extends keyof JSX.IntrinsicElements = 'div'
> = FREC<PropsWithoutRef<P> & RefAttributes<HTMLElements[T]>>

/* eslint-enable prettier/prettier */

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
