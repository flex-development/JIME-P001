import { IEntity } from '@app/subdomains/app'
import {
  NullishNumber,
  NullishString
} from '@flex-development/kustomzdesign/types'

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