import { ProductReviewResourceInput } from '@flex-development/kustomzdesign/types'
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { IProductReviewCreateRequest } from '../interfaces'

/**
 * @file Subdomain Models - Product Review Create Request
 * @module subdomains/products/models/ProductReviewCreateRequest
 */

export class ProductReviewCreateRequest implements IProductReviewCreateRequest {
  @IsEmail()
  email: ProductReviewResourceInput['email']

  @IsNumber()
  @IsString()
  productId: ProductReviewResourceInput['productId']

  @IsString()
  @MinLength(1)
  productSKU: ProductReviewResourceInput['productSKU']

  @IsString()
  @MaxLength(80)
  @MinLength(10)
  reviewMessage: ProductReviewResourceInput['reviewMessage']

  @IsIn([1, 2, 3, 4, 5])
  reviewRating: ProductReviewResourceInput['reviewRating']

  @IsBoolean()
  reviewRecommendProduct: ProductReviewResourceInput['reviewRecommendProduct']

  @IsOptional()
  @IsString()
  reviewSource?: ProductReviewResourceInput['reviewSource']

  @IsString()
  @MinLength(3)
  reviewTitle: ProductReviewResourceInput['reviewTitle']
}
