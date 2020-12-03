import { Entity } from '@flex-development/kustomzcore'
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'
import { IProfileSnippet } from './IProfileSnippet'

/**
 * @file Subdomain Model - Profile Snippet
 * @module subdomains/cms/models/ProfileSnippet/impl
 */

export class ProfileSnippet extends Entity implements IProfileSnippet {
  @IsNumber()
  @IsOptional()
  age?: IProfileSnippet['age']

  @IsUrl()
  @IsOptional()
  img?: IProfileSnippet['img']

  @IsString()
  @IsOptional()
  location?: IProfileSnippet['location']

  @IsString()
  @IsOptional()
  mood?: IProfileSnippet['mood']
}
