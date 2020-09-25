import { AnyObject } from '@flex-development/kustomtypez'
import { TextContentProps } from '@kustomz/types'
import { ClassDictionary } from 'classnames/types'

/**
 * @file Generate a class dictionary using {@link TextContentProps}
 * @module hooks/useTextUtilities
 * @see {@link https://github.com/JedWatson/classnames#usage}
 */

/**
 * Generates a class name dictionary for text content components.
 *
 * @param props - Text content properties
 * @param props.color - Text content color
 * @param props.size - Text content size
 */
export function useTextUtilities<P = AnyObject>(
  props: P,
  base = ''
): { dictionary: ClassDictionary; sanitized: typeof props } {
  const { color = false, size = false, ...rest } = props as TextContentProps
  const dictionary: AnyObject = {}

  const prefix =
    base === 'icon' || base.includes('link')
      ? base === 'nav-link'
        ? 'link'
        : base
      : 'text'

  if (base.length) dictionary[`${base}`] = true

  dictionary[`${prefix}-${color}`] = color
  dictionary[`${prefix}-${size}`] = base === 'heading' ? false : size

  return { dictionary, sanitized: rest as typeof props }
}
