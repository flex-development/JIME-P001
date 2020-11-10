import { MutatedProps as IMP } from '@flex-development/kustomzdesign/types'
import { IsOptional, IsString } from 'class-validator'

/**
 * @file Subdomain Models - MutatedProps
 * @module subdomains/app/models/MutatedProps
 *
 * @todo Add decorators for other `IMutatedProps` properties
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
