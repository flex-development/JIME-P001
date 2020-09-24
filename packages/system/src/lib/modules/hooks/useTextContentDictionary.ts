import { AnyObject } from '@flex-development/kustomtypez'
import { ClassDictionary } from 'classnames/types'
import { TextContentProps } from '../../declarations'

/**
 * @file Generate a class dictionary using {@link TextContentProps}
 * @module hooks/useTextContentDictionary
 * @see {@link https://github.com/JedWatson/classnames#usage}
 */

/**
 * Generates a class name dictionary for text content components.
 *
 * @param props - Text content properties
 * @param props.color - Text content color
 * @param props.size - Text content size
 */
export function useTextContentDictionary<P = AnyObject>(
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
