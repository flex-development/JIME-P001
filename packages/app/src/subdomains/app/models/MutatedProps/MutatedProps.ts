import { MutatedProps as IMP } from '@flex-development/kustomzdesign/types'
import { IsOptional, IsString } from 'class-validator'

/**
 * @file Subdomain Model - MutatedProps
 * @module subdomains/app/models/MutatedProps/impl
 */

export class MutatedProps implements IMP {
  @IsOptional()
  @IsString()
  className?: string

  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  title?: string
}
