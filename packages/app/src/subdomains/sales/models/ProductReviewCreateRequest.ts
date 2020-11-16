import { CreateProductReviewRequest } from '@flex-development/kustomzdesign/types'
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
 * @module subdomains/sales/models/ProductReviewCreateRequest
 */

export class ProductReviewCreateRequest implements IProductReviewCreateRequest {
  @IsEmail()
  email: CreateProductReviewRequest['email']

  @IsNumber()
  @IsString()
  productId: CreateProductReviewRequest['productId']

  @IsString()
  @MinLength(1)
  productSKU: CreateProductReviewRequest['productSKU']

  @IsString()
  @MaxLength(80)
  @MinLength(10)
  reviewMessage: CreateProductReviewRequest['reviewMessage']

  @IsIn([1, 2, 3, 4, 5])
  reviewRating: CreateProductReviewRequest['reviewRating']

  @IsBoolean()
  reviewRecommendProduct: CreateProductReviewRequest['reviewRecommendProduct']

  @IsOptional()
  @IsString()
  reviewSource?: CreateProductReviewRequest['reviewSource']

  @IsString()
  @MinLength(3)
  reviewTitle: CreateProductReviewRequest['reviewTitle']
}
