import { Entity } from '@app/subdomains/app/models/Entity'
import { IReview } from '@flex-development/types'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from 'class-validator'

/**
 * @file Subdomain Models - Product Review
 * @module subdomains/sales/models/Review
 */

export class Review extends Entity implements IReview {
  @IsString()
  @MaxLength(80)
  @MinLength(10)
  body: IReview['body']

  @IsNumber()
  customer_id: IReview['customer_id']

  @IsString()
  @MinLength(1)
  product_handle: IReview['product_handle']

  @IsNumber()
  product_id: IReview['product_id']

  @IsUrl()
  product_image_url: IReview['product_image_url']

  @IsString()
  @MinLength(1)
  product_sku: IReview['product_sku']

  @IsString()
  @MinLength(1)
  product_title: IReview['product_handle']

  @IsUrl()
  product_url: IReview['product_url']

  @IsBoolean()
  published: IReview['published']

  @IsIn([1, 2, 3, 4, 5])
  rating: IReview['rating']

  @IsString()
  @MinLength(3)
  title: IReview['title']
}
