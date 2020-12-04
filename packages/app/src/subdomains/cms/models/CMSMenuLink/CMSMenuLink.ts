import { MutatedProps } from '@subdomains/app/models/MutatedProps'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { ICMSMenuLink } from './ICMSMenuLink'

/**
 * @file Domain Object Model - CMS Menu Link
 * @module subdomains/cms/models/CMSMenuLink/impl
 */

export class CMSMenuLink extends MutatedProps implements ICMSMenuLink {
  @IsUUID('4')
  readonly uuid: ICMSMenuLink['uuid']

  @IsOptional()
  @IsString()
  href?: ICMSMenuLink['href']
}
