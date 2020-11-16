import {
  IsEmail,
  IsIn,
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
  email: IProductReviewCreateRequest['email']

  @IsString()
  productId: IProductReviewCreateRequest['productId']

  @IsString()
  @MinLength(1)
  productSKU: IProductReviewCreateRequest['productSKU']

  @IsString()
  @MaxLength(80)
  @MinLength(10)
  reviewMessage: IProductReviewCreateRequest['reviewMessage']

  @IsIn(['1', '2', '3', '4', '5'])
  reviewRating: IProductReviewCreateRequest['reviewRating']

  @IsIn(['false', 'true'])
  reviewRecommendProduct: IProductReviewCreateRequest['reviewRecommendProduct']

  @IsOptional()
  @IsString()
  reviewSource?: IProductReviewCreateRequest['reviewSource']

  @IsString()
  @MinLength(3)
  reviewTitle: IProductReviewCreateRequest['reviewTitle']
}
