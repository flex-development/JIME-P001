import { IsString, MaxDate } from 'class-validator'
import { IEntity } from '../interfaces/IEntity'

/**
 * @file Subdomain Models - Entity Base
 * @module subdomains/app/models/Entity
 */

export class Entity implements IEntity {
  @MaxDate(new Date())
  readonly created_at: number

  @IsString()
  readonly id: string
}
