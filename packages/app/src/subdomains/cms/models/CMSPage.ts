import {
  IndexTemplateProps,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { AnyObject } from '@flex-development/kustomzdesign/types'
import { Allow, IsBoolean, IsEnum, IsString, MinLength } from 'class-validator'
import { CMSPageComponents, ICMSPage } from '../interfaces/ICMSPage'
import { CMSEntity } from './CMSEntity'

/**
 * @file Business Object Model - CMS Page
 * @module subdomains/cms/models/CMSPage
 *
 * @todo Implement `CMSMetadata` model
 * @todo Implement `IndexTemplateProps` model
 * @todo Implement `PageTemplateProps` model
 */

export class CMSPage extends CMSEntity implements ICMSPage {
  @IsEnum(CMSPageComponents)
  component: 'IndexTemplate' | 'PageTemplate'

  @Allow()
  content: IndexTemplateProps | PageTemplateProps

  @IsBoolean()
  draft: boolean

  @Allow()
  metadata: AnyObject

  @IsString()
  @MinLength(1)
  path: string

  @IsString()
  @MinLength(1)
  title: string
}
