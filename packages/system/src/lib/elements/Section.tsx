import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
} from 'react'
import {ContentSectionProps, HTMLElementRefAttributes} from '../declarations'
import {useMutatedProps, useTextContentDictionary} from '../modules/hooks'

/**
 * @module lib/elements/Section
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/section}
 */

/**
 * {@link Section} component properties.
 */
export type SectionProps = Omit<ContentSectionProps, 'icon'>

/**
 * {@link Section} component properties without the `ref` property.
 */
export type ReflessSectionProps = PropsWithoutRef<SectionProps>

/**
 * {@link Section} component forward ref properties.
 */
export type SectionRefProps = ReflessSectionProps & HTMLElementRefAttributes

/**
 * Renders a `<section>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section**
 */
export const Section: FREC<SectionRefProps> = forwardRef((props, ref) => {
  const {dictionary, sanitized} = useTextContentDictionary<typeof props>(props)

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['section']
  >(sanitized, dictionary)

  return <section {...mutatedProps} ref={ref} />
})

Section.defaultProps = {}
