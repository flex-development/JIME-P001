import { CreateReviewRequest, IReview } from '@flex-development/kustomzcore'
import { ICustomerService } from '@subdomains/customers/services'
import { IReviewRepository } from '@subdomains/sales/repositories'
import { IProductService } from '../ProductService'

/**
 * @file Subdomain Interfaces - Product Review Service
 * @module subdomains/sales/interfaces/IReviewService
 */

export interface IReviewService extends IReviewRepository {
  customers: ICustomerService
  products: IProductService

  create(data: CreateReviewRequest): Promise<IReview>
}
