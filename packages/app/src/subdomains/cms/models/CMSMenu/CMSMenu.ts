import { MinLength, ValidateNested } from 'class-validator'
import { CMSEntity } from '../CMSEntity'
import { CMSMenuLink } from '../CMSMenuLink'
import { ICMSMenu } from './ICMSMenu'

/**
 * @file Subdomain Model - CMS Menu
 * @module subdomains/cms/models/CMSMenu/impl
 */

export class CMSMenu extends CMSEntity implements ICMSMenu {
  @ValidateNested({ each: true })
  links: Array<CMSMenuLink>

  @MinLength(1)
  title: ICMSMenu['title']
}
