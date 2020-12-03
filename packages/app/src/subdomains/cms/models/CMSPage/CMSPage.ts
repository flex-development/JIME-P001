import {
  IndexTemplateProps,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { Allow, IsBoolean, IsEnum, IsString, MinLength } from 'class-validator'
import { CMSEntity } from '../CMSEntity'
import { CMSPageComponents, ICMSPage } from './ICMSPage'

/**
 * @file Subdomain Models - CMS Page
 * @module subdomains/cms/models/CMSPage/impl
 */

export class CMSPage extends CMSEntity implements ICMSPage {
  @IsEnum(CMSPageComponents)
  component: ICMSPage['component']

  @Allow()
  content: IndexTemplateProps | PageTemplateProps

  @IsBoolean()
  draft: ICMSPage['draft']

  @Allow()
  metadata: ICMSPage['metadata']

  @IsString()
  @MinLength(1)
  path: ICMSPage['path']

  @IsString()
  @MinLength(1)
  title: ICMSPage['title']
}
