import { IEntity, NullishNumber, NullishString } from '@flex-development/types'

/**
 * @file Subdomain Interfaces - Profile Snippet Settings
 * @module subdomains/cms/interfaces/IProfileSnippet
 */

export interface IProfileSnippet extends IEntity {
  age?: NullishNumber
  img?: NullishString
  location?: NullishString
  mood?: NullishString
}
