import { IEntity } from '@flex-development/types'

/**
 * @file Domain Object Interfaces - CMS Entity
 * @module subdomains/cms/interfaces/ICMSEntity
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
