import { ContentSectionProps, HTMLElementRefAttributes } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { useMutatedProps } from '../hooks'

/**
 * @module lib/moelcules/Article
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/article}
 */

/**
 * {@link Article} component properties.
 */
export type ArticleProps = ContentSectionProps

/**
 * {@link Article} component properties without the `ref` property.
 */
export type ReflessArticleProps = PropsWithoutRef<ArticleProps>

/**
 * {@link Article} component forward ref properties.
 */
export type ArticleRefProps = ReflessArticleProps & HTMLElementRefAttributes

/**
 * Renders a `<article>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article**
 */
export const Article: FREC<ArticleRefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['article']
  >(props)

  return <article {...mutatedProps} ref={ref} />
})

Article.defaultProps = {}
