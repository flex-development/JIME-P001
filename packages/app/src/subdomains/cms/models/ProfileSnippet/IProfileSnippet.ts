import { NullishNumber, NullishString } from '@flex-development/json'
import { IEntity } from '@flex-development/kustomzcore'

/**
 * @file Subdomain Interface - Profile Snippet Settings
 * @module subdomains/cms/models/ProfileSnippet/interface
 */

export interface IProfileSnippet extends IEntity {
  age?: NullishNumber
  img?: NullishString
  location?: NullishString
  mood?: NullishString
}
