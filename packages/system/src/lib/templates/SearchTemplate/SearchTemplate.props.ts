import { IProductListing } from '@flex-development/kustomzcore'
import { MainProps } from '@system/lib/atoms'

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
