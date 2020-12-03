import { IEntity } from '@flex-development/kustomzcore'

/**
 * @file Subdomain Interface - CMS Entity
 * @module subdomains/cms/models/CMSEntity/interface
 */

/**
 * A CMS entity is an JSON object with a `uuid` property.
 */
export interface ICMSEntity extends IEntity {
  /**
   * Unique CMS id.
   */
  readonly uuid: string
}
