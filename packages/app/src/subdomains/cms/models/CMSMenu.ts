import { MinLength, ValidateNested } from 'class-validator'
import { ICMSMenu } from '../interfaces/ICMSMenu'
import { CMSEntity } from './CMSEntity'
import { CMSMenuLink } from './CMSMenuLink'

/**
 * @file Domain Object Model - CMS Menu
 * @module subdomains/cms/models/CMSMenu
 */

export class CMSMenu extends CMSEntity implements ICMSMenu {
  @ValidateNested({ each: true })
  links: Array<CMSMenuLink>

  @MinLength(1)
  title: string
}
