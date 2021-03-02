import type { IProductListing } from '@kustomzcore/types'
import type { MainProps } from '@system/lib/atoms/Main'

/**
 * @file Component Props - SearchTemplate
 * @module lib/templates/SearchTemplate/props
 */

export interface SearchTemplateProps extends MainProps {
  /**
   * Product search results.
   *
   * @default []
   */
  results?: Array<Partial<IProductListing>>
}
