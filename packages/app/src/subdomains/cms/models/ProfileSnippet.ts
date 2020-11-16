import { Entity } from '@app/subdomains/app/models/Entity'
import { NullishNumber, NullishString } from '@flex-development/types'
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'
import { IProfileSnippet } from '../interfaces'

/**
 * @file Subdomain Models - Profile Snippet
 * @module subdomains/cms/models/ProfileSnippet
 */

export class ProfileSnippet extends Entity implements IProfileSnippet {
  @IsNumber()
  @IsOptional()
  age?: NullishNumber

  @IsUrl()
  @IsOptional()
  img?: NullishString

  @IsString()
  @IsOptional()
  location?: NullishString

  @IsString()
  @IsOptional()
  mood?: NullishString
}
