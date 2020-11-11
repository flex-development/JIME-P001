import { MutatedProps } from '@app/subdomains/app/models/MutatedProps'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { ICMSMenuLink } from '../interfaces/ICMSMenuLink'

/**
 * @file Domain Object Model - CMS Menu Link
 * @module subdomains/cms/models/CMSMenuLink
 */

export class CMSMenuLink extends MutatedProps implements ICMSMenuLink {
  @IsUUID('4')
  readonly uuid: string

  @IsOptional()
  @IsString()
  href?: string
}
