import { Entity } from '@flex-development/kustomzcore'
import { IsUUID } from 'class-validator'
import { ICMSEntity } from './ICMSEntity'

/**
 * @file Subdomain Model - CMS Entity
 * @module subdomains/cms/models/CMSEntity/impl
 */

export class CMSEntity extends Entity implements ICMSEntity {
  @IsUUID('4')
  readonly uuid: ICMSEntity['uuid']
}
