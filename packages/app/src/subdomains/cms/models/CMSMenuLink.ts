import { MutatedProps } from '@app/subdomains/app'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { ICMSMenuLink } from '../interfaces/ICMSMenuLink'

/**
 * @file Domain Object Model - CMS Menu Link
 * @module subdomains/cms/models/CMSMenuLink
 *
 * @todo Add decorators for title, id, class name, etc
 */

export class CMSMenuLink extends MutatedProps implements ICMSMenuLink {
  @IsUUID('4')
  readonly uuid: string

  @IsOptional()
  @IsString()
  href?: string
}
