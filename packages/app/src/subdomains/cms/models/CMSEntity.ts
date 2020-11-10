import { Entity } from '@app/subdomains/app/models/Entity'
import { IsUUID } from 'class-validator'
import { ICMSEntity } from '../interfaces/ICMSEntity'

/**
 * @file Domain Object Model - CMS Entity
 * @module subdomains/cms/models/CMSEntity
 */

export class CMSEntity extends Entity implements ICMSEntity {
  @IsUUID('4')
  readonly uuid: string
}
