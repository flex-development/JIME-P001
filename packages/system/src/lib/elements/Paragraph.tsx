import { isBoolean, isString } from 'lodash'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { FontWeight, TextContentProps } from '../declarations'
import { useMutatedProps, useTextContentDictionary } from '../modules/hooks'

/**
 * @module lib/elements/Paragraph
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/p}
 */

/**
 * {@link Paragraph} component properties.
 */
export interface ParagraphProps extends TextContentProps<HTMLParagraphElement> {
  /**
   * If true, add the class `card-text`. Otherwise append the value to `card-`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/card/#titles-text-and-links
   *
   */
  card?: boolean | 'title'

  /**
   * If true, style text for `Form` component.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
   */
  form?: boolean

  /**
   * Font weight.
   *
   * @default false
   */
  weight?: FontWeight | boolean
}

/**
 * {@link Paragraph} component properties without the `ref` property.
 */
export type ReflessParagraphProps = PropsWithoutRef<ParagraphProps>

/**
 * Ref attributes for `<p>` elements.
 */
export type ParagraphRefAttributes = RefAttributes<HTMLParagraphElement>

/**
 * {@link Paragraph} component forward ref properties.
 */
export type ParagraphRefProps = ReflessParagraphProps & ParagraphRefAttributes

/**
 * Renders a `<p>` element with the class `text`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/p**
 * - **https://v5.getbootstrap.com/docs/5.0/utilities/text/**
 */
export const Paragraph: FREC<ParagraphRefProps> = forwardRef((props, ref) => {
  const { card, form, weight, ...rest } = props

  const { dictionary, sanitized } = useTextContentDictionary<typeof rest>(
    rest,
    'text'
  )

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['p']
  >(sanitized, {
    ...dictionary,
    'card-text': isBoolean(card) && card,
    'card-title': isString(card) && card === 'title',
    'form-text': form,
    [`font-${weight}`]: weight
  })

  return <p {...mutatedProps} ref={ref} />
})

Paragraph.defaultProps = {
  card: false,
  children:
    'The quick brown fox jumps over the lazy dog. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow. The five boxing wizards jump quickly. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. Jived fox nymph grabs quick waltz. Glib jocks quiz nymph to vex dwarf.',
  color: false,
  form: false,
  size: false,
  weight: false
}
